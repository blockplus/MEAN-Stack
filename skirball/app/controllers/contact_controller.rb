class ContactController < ApplicationController
  def new
    @class = "page media"
  end

  def create
    ContactMailer.send_message(params).deliver
    redirect_to :contact, notice: "Thanks for contacting us!"
  end
end
