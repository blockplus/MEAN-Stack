class EventItem < ActiveRecord::Base
  attr_accessible :cart_id, :event_id, :quantity
  belongs_to :cart
  belongs_to :event

  def title
    event.title
  end

  def total
    event.price * quantity
  end
end
