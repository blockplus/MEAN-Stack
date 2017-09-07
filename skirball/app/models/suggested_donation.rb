class SuggestedDonation < ActiveRecord::Base
  default_scope order("amount DESC")
  attr_accessible :amount, :title
end
