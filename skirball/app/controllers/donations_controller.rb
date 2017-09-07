class DonationsController < ApplicationController
  before_filter :require_login, only: [:create, :destroy]
  def new
    @class = "page donate"
    @page = Page.find('donate')
    @donations = SuggestedDonation.all
  end

  def create
    current_cart.create_donation(amount: params[:amount].gsub(/\$/,"").strip.to_i)
    redirect_to :cart
  end

  def destroy
    current_cart.donation.destroy
    redirect_to :cart
  end
end
