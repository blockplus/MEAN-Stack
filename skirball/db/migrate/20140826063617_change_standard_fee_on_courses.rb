class ChangeStandardFeeOnCourses < ActiveRecord::Migration
  def up
    change_column :courses, :standard_course_fee, :decimal, :default =>0
  end

  def down
    change_column :courses, :standard_course_fee, :decimal
  end
end
