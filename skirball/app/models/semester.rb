class Semester < ActiveRecord::Base
  extend FriendlyId
  include Concerns::Archivable
  attr_accessible :ends_at, :name, :starts_at, :early_bird_ends_at, :slug, :archived
  friendly_id :name, :use => :slugged
  has_many :courses
  alias_attribute :title, :name
  after_initialize :init

  def init
    self.starts_at ||= 2.months.from_now
    self.early_bird_ends_at ||= starts_at - 3.weeks
  end

  def schedule
    courses.live.map(&:class_dates).flatten
  end

  def start_date
    starts_at.to_date
  end

  def end_date
    ends_at.to_date
  end
end
