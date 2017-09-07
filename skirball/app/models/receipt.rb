class Receipt < ActiveRecord::Base
  attr_accessible :amount, :description, :purchase_id, :title
  belongs_to :purchase
end
