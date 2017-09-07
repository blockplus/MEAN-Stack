class Purchase < ActiveRecord::Base
  attr_accessible :account_id, :reference, :receipt, :total,
    :first_name, :last_name, :address, :address2, :city, :state,
    :zip, :phone, :email, :contact_preference, :additional_attendees
  belongs_to :account
  has_many :account_courses
  has_many :courses, :through => :account_courses
  has_many :account_events
  has_many :events, :through => :account_events
  has_one :account_donation
  has_one :donation, :through => :account_donation
  serialize :additional_attendees


  def send_registration_email
    if courses.present?
      PurchaseMailer.new_purchase(self).deliver
    end
  end
end
