require 'test_helper'

class SemesterTest < ActiveSupport::TestCase
  test "early_bird_ends_at defaults to 3 weeks before semester starts" do
    @semester = Semester.create({
      name: "Early Bird",
      starts_at: 28.days.from_now,
      ends_at: 3.months.from_now
    })
    assert @semester.early_bird_ends_at < 8.days.from_now, "Expected #{@semester.early_bird_ends_at} to be less than #{8.days.from_now}"
    assert @semester.early_bird_ends_at > 6.days.from_now, "Expected #{@semester.early_bird_ends_at} to be greater than #{6.days.from_now}"
  end

  test "early_bird_ends_at can be overridden" do
    Timecop.freeze do
      @semester = Semester.create({
        name: "Extremely Early Bird",
        starts_at: 4.months.from_now,
        ends_at:6.months.from_now,
        early_bird_ends_at: 2.months.from_now
      })
      assert_equal 2.months.from_now, @semester.early_bird_ends_at
    end
  end
end

