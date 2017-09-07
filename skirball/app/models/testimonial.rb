class Testimonial < ActiveRecord::Base
  attr_accessible :account_id, :content, :teacher_id
  belongs_to :account
  belongs_to :teacher
end
