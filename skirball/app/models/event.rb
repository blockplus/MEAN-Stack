class Event < ActiveRecord::Base
  include Rails.application.routes.url_helpers
  include Concerns::Archivable
  extend FriendlyId
  attr_accessible :description, :title, :date, :time, :location_id, :price, :slug, :preview
  friendly_id :title, use: :slugged
  alias_attribute :name, :title
  belongs_to :location
  has_many :account_events
  has_many :accounts, :through => :account_events
  after_initialize :init
  searchable :unless => :archived do
    text :title, :boost => 3
    text :description
  end
  
  def init
    self.location ||= Location.order('created_at ASC').first
  end

  def start_time
    day_at_time date, Time.zone.parse(time)
  end

  def date=(date_string)
    new_date = Date.parse date_string
    write_attribute(:date, new_date)
  end

  def day_at_time(day, time)
    DateTime.new(day.year, day.month, day.day, time.hour, time.min, time.sec)
  end

  def path 
    event_path(self)
  end
end
