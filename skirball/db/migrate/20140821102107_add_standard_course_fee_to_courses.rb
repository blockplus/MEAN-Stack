class AddStandardCourseFeeToCourses < ActiveRecord::Migration
  def up
    add_column :courses, :standard_course_fee, :decimal
  end
  def down
    remove_column :courses, :standard_course_fee
  end
end
