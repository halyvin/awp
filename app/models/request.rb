class Request < ActiveRecord::Base
  belongs_to :user
  belongs_to :client
  has_and_belongs_to_many :workers

  attr_accessible :body, :client, :client_id, :day, :time, :user, :user_id,
                  :closed, :close_reason, :worker_ids

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

  def as_json(options)
    {
      id: id,
      user: user.username,
      client_id: client.present? ? client.id : "",
      day: day.to_s,
      time: time,
      body: body,
      address: client.present? ? client.address  : "",
      workers: workers.each.map {|w| [w.name, w.id] }
    }
  end
end
