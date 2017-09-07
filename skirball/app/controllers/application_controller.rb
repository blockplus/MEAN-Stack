class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :logged_in?

  def current_cart
    Cart.find(session[:cart_id])
  rescue ActiveRecord::RecordNotFound
    cart = Cart.create
    session[:cart_id] = cart.id
    cart
  end

  def require_login
    if current_account.blank?
      save_target_url
      redirect_to :login
    end
  end

  def login(account)
    session[:account_id] = account.id
    redirect_after_authorization
  end

  def logged_in?
    current_account.present?
  end

  def logout
    session[:account_id] = nil
  end

  def current_account
    Account.find_by_id session[:account_id]
  end

  def redirect_after_authorization
    target_url = saved_target_url || root_url
    clear_target_url
    redirect_to target_url
  end

  def saved_target_url
    session[:saved_target_url]
  end

  def save_target_url
    session[:saved_target_url] = request.fullpath
  end

  def clear_target_url
    session[:saved_target_url] = nil
  end

  def authorize
    @account == current_account
  end
end
