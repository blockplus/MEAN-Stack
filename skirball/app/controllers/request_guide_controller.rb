class RequestGuideController < ApplicationController
  def new
    @class = "page media"
  end

  def create
    GuideMailer.request_guide(params).deliver
    redirect_to :request_guide, notice: "We will be sending you a guide shortly!"
  end
end
