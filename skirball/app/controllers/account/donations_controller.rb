class Account::DonationsController < ApplicationController
  def index
    # @donations = @account.donations
  end

  def show
    @donations = Donation.find(params[:id])
  end
end
