class Podcast < ActiveRecord::Base
  extend FriendlyId
  attr_accessible :notes, :title, :file, :file_remote_url, :slug, :published_on, :duration, :keywords, :subtitle, :guid, :itunes_url
  attr_reader :file_remote_url
  friendly_id :title, use: :slugged
  has_attached_file :file,
                    :storage => :s3,
                    :s3_credentials => {
                      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                    },
                    :s3_protocol => 'https',
                    :bucket => ENV['S3_BUCKET']
  searchable do
    text :title, :boost => 3
    text :keywords, :boost => 2
    text :subtitle, :boost => 2
    text :notes
  end 
  default_scope order("published_on DESC")
  before_create :set_default_published_on

  def set_default_published_on
    self.published_on ||= Time.now
  end

  def guid
    read_attribute(:guid) || read_attribute(:slug)
  end

  def file_remote_url=(url)
    self.file = URI.parse(url)
    @file_remote_url = url
  end
end
