class Client < ActiveRecord::Base
  has_many :requests

  attr_accessible :address, :login

  default_scope order("clients.login ASC")
end
