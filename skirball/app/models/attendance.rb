class Attendance < ActiveRecord::Base
  attr_accessible :account_id, :course_id
  belongs_to :account, :dependent => :destroy
  belongs_to :course, :dependent => :destroy
  belongs_to :purchase, :dependent => :destroy
end
