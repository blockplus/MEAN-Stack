class Course < ActiveRecord::Base
  include Rails.application.routes.url_helpers
  include Concerns::Archivable
  extend FriendlyId
  require 'ostruct'
  attr_accessible :description, :semester_id, :state, :teacher_id, :title, :subject_ids,  :subtitle, :event_attributes,
                  :slug, :start_time, :image, :day_of_week, :location_id, :end_time, :start_date, :end_date, :custom_dates, :ignore_discount, :teacher_ids,
                  :temple_member_discount_fee, :standard_course_fee
  friendly_id :title, use: :slugged
  has_many :course_subjects, :dependent => :destroy
  has_many :subjects, :through => :course_subjects
  accepts_nested_attributes_for :course_subjects
  accepts_nested_attributes_for :subjects
  belongs_to :location
  has_many :attendances
  has_many :attendees, :through => :attendances, :class_name => "Account", :source => :account
  has_many :account_courses
  has_many :accounts, :through => :account_courses
  has_many :course_teachers, :dependent => :destroy
  has_many :teachers, :through => :course_teachers
  belongs_to :semester
  scope :open, -> { where(state: 'open') }

searchable :unless => :archived do
    text :title, :boost => 3
    text :description
    text :semester do
      semester.title
    end
    text :subjects, :boost => 2 do
      subjects.map(&:title)
    end
    text :teacher do
      teacher.name
    end
  end
  has_attached_file :image, 
                    :styles => { :default => "159x159#" },
                    :storage => :s3,
                    :s3_credentials => {
                      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                    },
                    :s3_protocol => 'https',
                    :default_url => '/assets/home_grid7.jpg',
                    :bucket => ENV['S3_BUCKET']
  
  
  after_initialize :init
  
  def init
    self.semester ||= Semester.order('created_at DESC').first
    self.state ||= 'open'
    self.start_date ||= semester.starts_at
    self.end_date ||= semester.ends_at
    self.day_of_week ||= 'Thursday'
    self.start_time ||= '6:30pm'
    self.end_time ||= (Time.parse(start_time)+ 90.minutes).strftime("%-l:%M%P")
    self.location ||= Location.order('created_at DESC').first
  end

  def teacher
    teachers.first
  end

  def humanized_class_dates
    grouped_by_month = class_dates.map(&:start_time).group_by do |date|
      date.strftime("%b")
    end
    grouped_by_month.map do |month|
      "#{month[0]} " + month[1].map{ |d| d.day }.join(', ')
    end.join(" ")
  end

  def class_dates
    if custom_dates.present?
      parse_custom_dates
    else
      dates = []
      date = start_date
      begin
        next_class = next_class_at(date)
        dates << OpenStruct.new(name: title, start_time: next_class, path: course_path(self))
        date += 7
      end while next_class_at(date) < end_date
      dates
    end
  end

  def parse_custom_dates
    custom_dates.split(",").map do |date|
      OpenStruct.new({
        name: title,
        start_time: day_at_time(Date.parse(date.strip), Time.zone.parse(start_time)),
        path: course_path(self)
      })
    end
  end

  def next_class_at(date)
    weekday = Date::DAYNAMES.index(day_of_week)
    if weekday >= date.wday
      delta = weekday - date.wday
      day_at_time( (date + delta), Time.zone.parse(start_time) )
    else
      day_at_time(date.next_week(day_of_week.downcase.to_sym), Time.zone.parse(start_time))
    end
  end

  def day_at_time(day, time)
    DateTime.new(day.year, day.month, day.day, time.hour, time.min, time.sec).in_time_zone
  end

  # def is_early_bird?
  #   Time.now < early_bird_ends_at
  # end
  #
  # def early_bird_ends_at
  #   read_attribute(:early_bird_ends_at) || semester.early_bird_ends_at
  # end

  def price(discount)
    #is_early_bird? ? early_bird_cost : cost
    if (discount == true)
      if (temple_member_discount_fee.nil? || temple_member_discount_fee == "")
        0
      else
        temple_member_discount_fee
      end
    else
      if (standard_course_fee.nil? || standard_course_fee == "")
        0
      else
        standard_course_fee
      end
    end
  end

  def open?
    state == "open"
  end

  def closed?
    state == "closed"
  end

  def discountable?
    ignore_discount == false

  end

end
