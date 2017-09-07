class SandboxMailInterceptor
  def self.delivering_email(message)
    message.to = 'eric@iamericsteele.com'
    if Rails.env.staging?
      message.to << 'info@adultjewishlearning.org'
    end
  end
end
