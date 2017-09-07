class CartsController < ApplicationController
  before_filter :require_login

  def show
    @class = "page full nobackground"
    @card = params[:card] || {}
    @address = params[:address] || {}
    @cart = current_cart
    if @cart.donation.present?
      donation = SuggestedDonation.find_by_amount(@cart.donation.amount)
      @donation_title = donation.present? ? donation.title : "#{view_context.number_to_currency(@cart.donation.amount)} Donation"
    end


    @fees = [ { :id => 1, :name => 'Foo' }]

  end

  def name
    'aa'
  end

  def discount
    current_cart.update_attribute(:coupon_id, params[:coupon_id])
    redirect_to :cart
  end
end
