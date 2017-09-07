class DonationMailer < ActionMailer::Base
  default from: "info@adultjewishlearning.org"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.donation_mailer.thank.subject
  #
  def thank(donation)
    @donation = donation

    mail to: @donation.account.email, subject: "Thank you for your generous gift!", bcc: 'info@adultjewishlearning.org'
  end
end
