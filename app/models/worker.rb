class Worker < ActiveRecord::Base
  attr_accessible :name

  default_scope order('workers.id asc')
end
