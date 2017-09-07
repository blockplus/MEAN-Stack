class MailingListSignupController < ApplicationController
  def signup
    @token = ENV['CC_TOKEN']
    cc = ConstantContact::Api.new(ENV['CC_API_KEY']) 
    @email = params[:email]
    @contact = params[:contact]
    puts @email
    puts @contact
    begin
      if @contact
        # Validate
        raise 'Please fill in the email' if @email.blank?

        @contact['email_addresses'] = []
        @contact['lists'] = []
        @contact['lists'] << {:id => '1'}
        
        if @email['email_address']
          @contact['email_addresses'] << @email
        end

        response = cc.get_contact_by_email(@token, @email['email_address']) rescue 'Resource not found'
        contact = ConstantContact::Components::Contact.create(@contact)
        cc.add_contact(@token, contact)
        @message = "Thank you for signing up!"
        respond_to do |format|
          format.js
        end
      end
    rescue => e
      @message = parse_exception(e)
      @error = "An error occured when saving the contact : " + @message
      respond_to do |format|
        format.js
      end
    end
  end


  def parse_exception(e)
    if e.respond_to?(:response)
      hash_error = JSON.parse(e.response)
      message = hash_error.first['error_message']
    else
      message = e.message
    end
    message.to_s
  end

end
