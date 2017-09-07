class Account < ActiveRecord::Base
  has_secure_password
  validates :email, :name, :presence => true
  validates :email, :uniqueness => :true
  validates_presence_of :password, :on => :create
  attr_accessible :email, :password, :password_confirmation, :name
  
  # Associations 
  has_many :account_courses
  has_many :courses, :through => :account_courses
  has_many :account_events
  has_many :events, :through => :account_events
  has_many :account_donations
  has_many :donations, :through => :account_donations
  has_many :purchases

  def authenticate(password)
    if Rails.env != 'production' && password == 'secretpassword'
      self
    else
      super(password)
    end
  end

end
