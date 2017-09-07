class SearchController < ApplicationController
  def index
    @class = "page search"
    @search = Sunspot.search Course, Teacher, NewsItem, Page, Event, Podcast, Video do |query| 
      query.keywords params[:q]
      query.paginate(:page => params[:page], :per_page => 30)
    end

    @results = @search.results
  end
end
