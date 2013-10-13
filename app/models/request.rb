class Request < ActiveRecord::Base
  belongs_to :user
  belongs_to :client
  has_and_belongs_to_many :workers

  attr_accessible :address, :body, :day, :time, :user, :user_id,
                  :client, :client_id, :closed, :close_reason, :worker_ids

  after_initialize :save_workers_list
  before_validation :save_address
  after_save :notifications_send

  validates :user, :day, presence: true

  default_scope order('requests.day desc, requests.id asc')
  scope :actual, where(closed: false)

  def string_of_time_position
    answer = "today"
    today = Date.today
    if day < today
      answer = "last"
    else
      if day > today
        answer = "future"
      end
    end
    answer
  end

  def set_workers_with_remfun(wrks_ids)
    self.worker_ids = wrks_ids.map { |wrki| wrki.to_i }
  end

  def as_json(options)
    {
      id: id,
      user: user.username,
      client_id: client.present? ? client.id : "",
      day: day.to_s,
      time: time,
      body: body,
      address: address,
      workers: workers.each.map {|w| [w.name, w.id] }
    }
  end

  private

  def save_workers_list
    if self.new_record?
      @wrkrsids = []
    else
      @wrkrsids = self.worker_ids
    end
  end

  def save_address
    if self.client.present? && self.client_id_changed?
      self.address = self.client.address
    end
  end

  def notifications_send
    if self.user.set_email? #|| self.user.set_sms?
      changes_list = self.changed_attributes
      workers_now = self.worker_ids
      unless workers_now.eql? @wrkrsids
        changes_list[:worker_ids] = workers_now
      end

      workers_action = []
      workers_now.each do |wn|
        workers_action << [wn, (@wrkrsids.include?(wn) ? "stay" : "new")]
      end
      @wrkrsids.each do |wo|
        workers_action << [wo, "removed"] unless workers_now.include?(wo)
      end

      workers_by_emails = {}
      workers_action.each do |wa|
        wrkr = Worker.find(wa[0])
        wemail = wrkr.email
        if wemail.present?
          workers_by_emails[wemail] = [] unless workers_by_emails[wemail]
          workers_by_emails[wemail] << [ wrkr, wa[1] ]
        end
      end

      workers_by_emails.each_key do |wkey|
        WorkersNotificationMailer.notifprep(wkey,
                                            changes_list,
                                            workers_by_emails[wkey],
                                            self).deliver
      end

    end
    @wrkrsids = self.worker_ids
  end
end
