class EventItemsController < ApplicationController
  before_filter :require_login
  def create
    current_cart.event_items.create(event_id: params[:event_id])
    redirect_to :cart
  end

  def update_quantity
    @event_item = EventItem.find(params[:id])
    if params[:quantity].to_i < 1
      @event_item.destroy
    else
      @event_item.update_attribute(:quantity, params[:quantity])
    end
    redirect_to :cart
  end

  def destroy
    EventItem.find(params[:id]).destroy
    redirect_to :cart
  end
end
