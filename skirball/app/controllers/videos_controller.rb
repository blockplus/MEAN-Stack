class VideosController < ApplicationController
  before_filter do
    @class = "page media"
  end

  def index
    @videos = Video.all
  end

  def show
    @video = Video.find(params[:id])
  end
end
