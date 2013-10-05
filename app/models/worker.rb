class Worker < ActiveRecord::Base
  attr_accessible :name

  has_and_belongs_to_many :requests

  default_scope order('workers.id asc')
end
