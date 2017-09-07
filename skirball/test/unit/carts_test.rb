require 'test_helper'

class CartsTest < ActiveSupport::TestCase
  def setup
    @cart = Cart.create
  end

  test "a cart has a total amount" do
    @cart.line_items.create(course_id: courses(:forty_dollar_course).id)
    assert_equal 40, @cart.total
  end

  test "cart increments quantity for existing courses" do
    @cart.line_items.create(course_id: courses(:science).id)
    @cart.line_items.create(course_id: courses(:science).id)
    assert_equal @cart.line_items.count, 1
    assert_equal @cart.line_items.first.quantity, 2
  end

  test "cart increments quantity for existing events" do
    @cart.event_items.create(event_id: events(:fifty_dollar_event).id)
    @cart.event_items.create(event_id: events(:fifty_dollar_event).id)
    assert_equal @cart.event_items.count, 1
    assert_equal @cart.event_items.first.quantity, 2
  end

  test "discountable_total only returns the course subtotals" do
    @cart.event_items.create(event_id: events(:fifty_dollar_event).id)
    @cart.line_items.create(course_id: courses(:forty_dollar_course).id)
    assert_in_delta 40, @cart.discountable_total, 0.1
  end

  test "total includes course, event, and donation subtotals" do
    @cart.event_items.create(event_id: events(:fifty_dollar_event).id)
    @cart.line_items.create(course_id: courses(:forty_dollar_course).id)
    @cart.create_donation(amount: 10)
    assert_in_delta 100, @cart.total, 0.1
  end

  test "cart total takes line item quantity into account" do
    @cart.line_items.create(course_id: courses(:forty_dollar_course).id)
    assert_equal 40, @cart.total 
  end

  test "a cart applies a discount" do
    @cart.line_items.create(course_id: courses(:forty_dollar_course).id)
    @cart.apply_discount coupons(:twenty_five_percent_off)
    assert_in_delta 30, @cart.total, 1
  end

  test "a cart is discounted if two courses are registered" do
    @cart.line_items.create(course_id: courses(:forty_dollar_course).id)
    @cart.line_items.create(course_id: courses(:sixty_dollar_course).id)
    assert_in_delta 90, @cart.total, 1
  end

  test "a cart discount is replaced if a new discount is larger" do
    @cart.line_items.create(course_id: courses(:forty_dollar_course).id)
    @cart.apply_discount coupons(:twenty_five_percent_off)
    assert_in_delta 30, @cart.total, 1
    @cart.apply_discount coupons(:fifty_percent_off)
    assert_in_delta 20, @cart.total, 1
  end

  test "a cart discount is kept if a new discount is smaller" do
    @cart.line_items.create(course_id: courses(:forty_dollar_course).id)
    @cart.apply_discount coupons(:fifty_percent_off)
    assert_in_delta 20, @cart.total, 1
    @cart.apply_discount coupons(:twenty_five_percent_off)
    assert_in_delta 20, @cart.total, 1
  end

  test 'multi-course discounts are disabled for the summer' do
    assert_nil carts(:multi).discount
  end

  test 'multi-course discount should be 10 percent off' do
    assert_not_equal 10, carts(:multi).discount.amount
  end

  test "a multi-course discount is not applied if an existing discount is larger" do
    @cart.line_items.create(course_id: courses(:forty_dollar_course).id)
    @cart.apply_discount coupons(:fifty_percent_off)
    @cart.line_items.create(course_id: courses(:sixty_dollar_course).id)
    assert_in_delta 50, @cart.total, 1
  end

  test "a multi-course discount is kept if a new discount is smaller" do
    @cart.line_items.create(course_id: courses(:forty_dollar_course).id)
    @cart.line_items.create(course_id: courses(:sixty_dollar_course).id)
    @cart.apply_discount coupons(:five_percent_off)
    assert_in_delta 90, @cart.total, 1
  end
end
