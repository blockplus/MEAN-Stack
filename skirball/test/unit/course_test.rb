require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  test "courses set defaults" do
    @course = courses(:default)
    assert_equal 'open', @course.state
    assert_equal 290, @course.cost
    assert_equal 240, @course.early_bird_cost
    assert_not_nil @course.day_of_week
    assert_not_nil @course.start_time
    assert_not_nil @course.end_time
    assert_not_nil @course.semester
    assert_not_nil @course.location
  end

  test "price returns the cost" do
    @course = courses(:science)
    assert_equal @course.price, @course.cost
  end

  test "early bird pricing inherits from the semester" do
    @course = courses(:early_bird)
    assert_equal @course.semester.early_bird_ends_at, @course.early_bird_ends_at
  end

  test "early bird pricing can be overridden" do
    @course = courses(:early_bird)
    assert_equal @course.semester.early_bird_ends_at, @course.early_bird_ends_at
    @course.update_attribute(:early_bird_ends_at, 1.week.ago)
    assert_not_equal @course.semester.early_bird_ends_at, @course.early_bird_ends_at
  end

  test "price returns early cost if it is early bird" do
    @course = courses(:early_bird)
    assert_equal @course.early_bird_cost, @course.price
  end

  test "price returns regular cost if it is early bird" do
    @course = courses(:not_early_bird)
    assert_equal @course.cost, @course.price
  end

  test "courses know if they are early bird" do
    @course = courses(:early_bird)
    assert @course.is_early_bird?
  end

  test "courses have a default day of the week" do
    @course = courses(:default)
    assert_not_nil @course.day_of_week
  end

  test "next_class_at returns the next date of a class" do
    @course = courses(:science)
    yesterday = 1.day.ago
    @course.day_of_week = Date::DAYNAMES[yesterday.wday]
    assert @course.next_class_at(Date.today) > 2.days.from_now, "Expected #{@course.next_class_at(Date.today)} to be greater than #{2.days.from_now}"
  end

  test "next_class_at returns today if the next class falls on same date" do
    @course = courses(:science)
    @course.day_of_week = Date::DAYNAMES[Time.now.wday]
    assert @course.next_class_at(Date.today) > 1.day.ago, "Expected #{@course.next_class_at(Date.today)} to be greater than #{1.day.ago}" 
    assert @course.next_class_at(Date.today) < 1.day.from_now, "Expected #{@course.next_class_at(Date.today)} to be less than #{1.day.from_now}"
  end

  test "next_class_at returns a date next week if the day of the week has passed" do
    @course = courses(:science)
    tomorrow = 1.day.from_now
    @course.day_of_week = Date::DAYNAMES[tomorrow.wday]
    assert @course.next_class_at(Date.today) < 2.days.from_now
  end

  test "class_dates return every course date in the semester" do
    @course = courses(:four_week_course)
    assert_equal 4, @course.class_dates.count
  end

  test "class_dates objects respond to name, start_time, and path" do
    @course = courses(:four_week_course)
    date = @course.class_dates.first
    assert_respond_to date, "name"
    assert_respond_to date, "start_time"
    assert_respond_to date, "path"
  end
end
