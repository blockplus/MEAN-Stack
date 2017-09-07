class CourseTeacher < ActiveRecord::Base
  attr_accessible :course_id, :teacher_id
  belongs_to :course
  belongs_to :teacher
end
