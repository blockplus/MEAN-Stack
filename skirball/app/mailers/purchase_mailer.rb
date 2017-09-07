class PurchaseMailer < ActionMailer::Base
  default from: 'info@adultjewishlearning.org'

  def new_purchase(purchase)
    @purchase = purchase
    mail to: @purchase.account.email, subject: "Thank you for registering!", bcc: 'info@adultjewishlearning.org'
  end

  def receipt(purchase)
    @purchase = purchase
    mail to: 'info@adultjewishlearning.org', subject: "Purchase receipt for order ##{@purchase.id}"
  end
end
