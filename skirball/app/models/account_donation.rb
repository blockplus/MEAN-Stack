class AccountDonation < ActiveRecord::Base
  attr_accessible :account_id, :donation_id, :purchase_id
  belongs_to :account
  belongs_to :donation
  belongs_to :purchase
end
