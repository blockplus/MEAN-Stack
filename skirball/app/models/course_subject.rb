class CourseSubject < ActiveRecord::Base
  attr_accessible :course_id, :subject_id
  belongs_to :course
  belongs_to :subject
end
