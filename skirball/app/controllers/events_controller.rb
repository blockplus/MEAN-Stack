class EventsController < ApplicationController
  def show
    @class = "page event"
    @event = Event.find(params[:id])
    if @event.archived?
      flash.now[:notice] = "This Event is no longer available for registration"
    end
  end

  def index
    @class = "page event"
    @events = Event.live.where("date > ?", Date.yesterday).order('date ASC')
  end
end
