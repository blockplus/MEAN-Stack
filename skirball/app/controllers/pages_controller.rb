class PagesController < ApplicationController
  def show
    @class = "page media"
    @page = Page.find(params[:id])
  end
  
  def home
    @slides = Slide.limit(8)
    render layout: 'home'
  end

  def calendar
    @class = "page full nobackground"
    @events = Semester.all.map(&:schedule).flatten + Event.live.to_a
  end
end
