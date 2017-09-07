class GuideMailer < ActionMailer::Base
  default from: 'info@adultjewishlearning.org'

  def request_guide(args = {})
    @name = args[:name]
    @address = args[:address]
    @phone = args[:phone]
    @email = args[:email]
    mail subject: "New Guide Request", to: "info@adultjewishlearning.org"
  end
end
