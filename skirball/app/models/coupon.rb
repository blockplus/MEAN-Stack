class Coupon < ActiveRecord::Base
  attr_accessible :rule, :amount, :title
  after_initialize :init
  
  def init
    self.rule ||= :amount
    self.amount ||= 20.00
  end
end
