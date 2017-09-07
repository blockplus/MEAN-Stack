module CouponsHelper
  def discount_label(coupon)
    "#{humanize_discount coupon} with '#{coupon.title}' Discount"
  end

  def humanize_discount(coupon)
    case coupon.rule
    when 'amount'
      "#{number_to_currency coupon.amount} off"
    when 'percent'
      "#{coupon.amount}% off"
    end
  end
end
