class NewsItemsController < ApplicationController
  def index
    @class = "page event"
    @news_items = NewsItem.live
  end
end
