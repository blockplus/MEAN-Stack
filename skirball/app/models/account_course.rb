class AccountCourse < ActiveRecord::Base
  attr_accessible :account_id, :course_id, :purchase_id, :quantity, :additional_attendees
  belongs_to :account
  belongs_to :course
  belongs_to :purchase
  serialize :additional_attendees
end
