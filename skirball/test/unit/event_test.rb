require 'test_helper'

class EventTest < ActiveSupport::TestCase
  test "events respond to name, start_time, and path" do
    @event = events(:fifty_dollar_event)
    assert_respond_to @event, "name"
    assert_respond_to @event, "start_time"
    assert_respond_to @event, "path"
  end

  test "events return start_time based on date and time attributes" do
    @event = events(:default)
    @event.time = "7 pm"
    @event.date = 1.week.from_now
    assert_equal 1.week.from_now.day, @event.start_time.day
    assert_equal 1.week.from_now.month, @event.start_time.month
    assert_equal 1.week.from_now.year, @event.start_time.year
    assert_equal Time.zone.parse("7 pm").hour, @event.start_time.hour
    assert_equal 0, @event.start_time.min
  end
end
