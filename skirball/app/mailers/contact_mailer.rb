class ContactMailer < ActionMailer::Base
  default from: 'info@adultjewishlearning.org'

  def send_message(params)
    @message = params[:message]
    @name = params[:name]
    @email = params[:email]
    mail to: "info@adultjewishlearning.org", reply_to: @email, subject: "New Contact Message"
  end
end
