class Request < ActiveRecord::Base
  belongs_to :user

  has_and_belongs_to_many :workers

  attr_accessible :address, :body, :day, :time, :user, :worker_ids

  validates :user, :day, presence: true

  default_scope order('requests.day desc, requests.id desc')
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
end
