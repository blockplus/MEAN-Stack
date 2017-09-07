class PurchasesController < ApplicationController
  include ActiveMerchant::Billing
  before_filter :require_login

  def create
    if current_cart.total == 0
      contact_params = params[:address].merge(params[:card].slice(:first_name, :last_name))
      @purchase = Purchase.create(
        contact_params.merge({
          total: current_cart.total,
          account_id: current_account.id,
          reference: 'NO_TRANSACTION',
          receipt: render_to_string(partial: 'purchases/receipt', locals: {cart: current_cart, contact_params: contact_params})
        })
      )
      current_cart.unload @purchase, current_account
      if @purchase.courses.present? || @purchase.events.present?
        PurchaseMailer.new_purchase(@purchase).deliver
        PurchaseMailer.receipt(@purchase).deliver
      end
      current_cart.destroy
      redirect_to purchase_path(@purchase), notice: "Registration is complete!"
    else
      ActiveMerchant::Billing::Base.mode = :test unless Rails.env.production?
      gateway = ActiveMerchant::Billing::AuthorizeNetGateway.new(
        login: ENV['AUTHORIZE_NET_API_LOGIN_ID'],
        password: ENV['AUTHORIZE_NET_TRANSACTION_KEY']
      )
      amount = (current_cart.total * 100).to_i
      card = ActiveMerchant::Billing::CreditCard.new params[:card]
      if card.valid?
        options = { email: current_account.email, billing_address: params[:address] }
        response = gateway.purchase amount, card, options
        if response.success?
          contact_params = params[:address].merge(params[:card].slice(:first_name, :last_name))
          @purchase = Purchase.create(
            contact_params.merge({
              total: current_cart.total,
              account_id: current_account.id,
              reference: response.authorization,
              receipt: render_to_string(partial: 'purchases/receipt', locals: {cart: current_cart, contact_params: contact_params})
            })
          )
          current_cart.unload @purchase, current_account
          if @purchase.courses.present? || @purchase.events.present?
            PurchaseMailer.new_purchase(@purchase).deliver          
          end
          if @purchase.donation.present?
            DonationMailer.thank(@purchase.donation).deliver
          end
          if @purchase.courses.present? || @purchase.events.present? || @purchase.donation.present?
            PurchaseMailer.receipt(@purchase).deliver
          end
          current_cart.destroy
          redirect_to purchase_path(@purchase), notice: "Purchase went through successfully!"
        else
          redirect_to :cart, :flash => { :error => response.message }
        end
      else
        redirect_to :cart, :flash => { :error => "There was a problem processing your card" }
      end
    end
  end

  def show
    @class = "page full nobackground"
    @purchase = Purchase.find(params[:id])
  end
end
