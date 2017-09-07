require 'test_helper'

class SlideTest < ActiveSupport::TestCase
  test "the slide default sort order is last" do
    @slide = Slide.new
    assert_equal Slide.count + 1, @slide.sort_order
  end
end
