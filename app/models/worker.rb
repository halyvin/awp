class Worker < ActiveRecord::Base
  has_and_belongs_to_many :requests
  
  attr_accessible :name, :email

  default_scope order('workers.id asc')
end
