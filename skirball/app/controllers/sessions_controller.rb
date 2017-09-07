class SessionsController < ApplicationController
  def new
    @class = "page full nobackground"
    @account = Account.new
  end

  def create
    @account = Account.find_by_email(params[:email])
    if @account.present?
      if @account.authenticate(params[:password])
        login @account
      else
        flash[:error] = "Your password was incorrect"
        redirect_to action: :new
      end
    else
      flash[:error] = "We couldn't find an account with the email #{params[:email]}."
      redirect_to action: :new 
    end
  end

  def destroy
    logout
    redirect_to :root
  end
end
