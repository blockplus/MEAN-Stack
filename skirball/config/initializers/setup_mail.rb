ActionMailer::Base.register_interceptor(SandboxMailInterceptor) if Rails.env.development?
