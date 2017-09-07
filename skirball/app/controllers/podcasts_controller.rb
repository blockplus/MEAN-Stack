class PodcastsController < ApplicationController
  before_filter do
    @class = 'page media'
  end

  def index
    @podcasts = Podcast.paginate(:page => params[:page], :per_page => 10).order('published_on DESC')
  end

  def show
    @podcast = Podcast.find(params[:id])
    respond_to do |format|
      format.html { render 'show' }
      format.mp3 { redirect_to @podcast.file.s3_object.url_for(:get, :response_content_disposition => "attachment").to_s }
    end
  end

  def feed
    @podcasts = Podcast.all
  end
end
