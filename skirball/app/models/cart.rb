require 'ostruct'
class Cart < ActiveRecord::Base
  attr_accessible :coupon
  has_many :line_items, :dependent => :destroy do
    def create(args)
      if self.exists?(args)
        item = self.where(args).first
        item.increment! :quantity
        item
      else
        super(args)
      end
    end
  end
  has_many :event_items, :dependent => :destroy do
    def create(args)
      if self.exists?(args)
        item = self.where(args).first
        item.increment! :quantity
        item
      else
        super(args)
      end
    end
  end
  has_one :donation
  belongs_to :coupon

  def self.clean
    carts = Cart.select do |cart|
      cart.empty? || cart.updated_at < 7.days.ago
    end
    carts.each(&:destroy)
  end

  def unload(purchase, account)
    line_items.each do |item|
      attendees = purchase.additional_attendees.try(:fetch, 'courses', nil).try(:fetch, item.course.id.to_s, nil).try(:values)
      AccountCourse.create(
        course_id: item.course.id,
        purchase_id: purchase.id,
        account_id: account.id,
        quantity: item.quantity,
        additional_attendees: attendees
      )
    end
    event_items.each do |item|
      attendees = purchase.additional_attendees.try(:fetch, 'events', nil).try(:fetch, item.event.id.to_s, nil).try(:values)
      AccountEvent.create(
        event_id: item.event.id,
        purchase_id: purchase.id,
        account_id: account.id,
        quantity: item.quantity,
        additional_attendees: attendees
      )
    end
    if donation.present?
      AccountDonation.create(
        donation_id: donation.id,
        purchase_id: purchase.id,
        account_id: account.id
      )
      donation.update_attribute(:cart_id, nil)
    end
  end

  def empty?
    line_items.blank? && event_items.blank? && donation.blank?
  end

  def total
    discountable_total + nondiscountable_total
  end

  def discount
    self.coupon
    ## Removed for the Summer 2014 Semester
    # if line_items.discountable.count > 1
    #   if coupon.present? && calculate_discount(coupon) >= calculate_discount(multi_cart_discount)
    #     self.coupon
    #   else
    #     multi_cart_discount
    #   end
    # else
    #   coupon
    # end
  end

  def multi_cart_discount
    OpenStruct.new rule: "percent", amount: 10.0, title: "Multiple Course"
  end

  def discountable_subtotal
    line_items.discountable.sum(&:total)
  end

  def discountable_total
    if discount.present?
      discountable_subtotal - calculate_discount(discount)
    else
      discountable_subtotal
    end
  end

  def nondiscountable_total
    event_items.sum(&:total) + donation_total + line_items.nondiscountable.sum(&:total)
  end

  def donation_total
    donation.present? ? donation.amount : 0
  end

  def apply_discount(discount_to_apply)
    if discount.blank? || calculate_discount(discount_to_apply) >= calculate_discount(self.discount)
      self.update_attribute :coupon, discount_to_apply 
    end
  end

  def calculate_discount(discount = self.discount)
    case discount.rule
    when "percent"
      discountable_subtotal * ( discount.amount / 100 )
    when "amount"
      discount.amount > discountable_subtotal ? discountable_subtotal : discount.amount
    end
  end 

  def calculate_amount(amount)
    case discount.rule
    when "percent"
      amount * ( discount.amount / 100 )
    when "amount"
      discount.amount > amount ? amount : amount - discount.amount
    end
  end
end
