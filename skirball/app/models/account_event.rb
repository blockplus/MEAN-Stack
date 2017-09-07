class AccountEvent < ActiveRecord::Base
  attr_accessible :account_id, :event_id, :purchase_id, :quantity, :additional_attendees
  belongs_to :account
  belongs_to :event
  belongs_to :purchase
  serialize :additional_attendees
end
