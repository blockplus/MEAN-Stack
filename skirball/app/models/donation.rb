class Donation < ActiveRecord::Base
  attr_accessible :amount, :cart_id
  belongs_to :cart
  has_one :account_donation
  has_one :account, :through => :account_donation
  has_one :purchase, :through => :account_donation
end
