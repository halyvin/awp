class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :registerable, :recoverable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :rememberable, :trackable, :validatable

  has_many :requests, :dependent => :destroy

  attr_accessible :email, :name, :password, :password_confirmation, :remember_me,
                  :set_email, :set_sms, :username, :observer
end
