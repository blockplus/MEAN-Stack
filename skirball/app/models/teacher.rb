class Teacher < ActiveRecord::Base
  extend FriendlyId
  include Concerns::Archivable
  attr_accessible :biography, :name, :testimonial, :testimonial_source, :image, :slug
  friendly_id :name, :use => :slugged
  has_many :course_teachers, :dependent => :destroy
  has_many :courses, :through => :course_teachers
  searchable :unless => :archived do
    text :name, :boost => 3
    text :biography
    text :courses do
      courses.map(&:title)
    end
  end
  
  has_attached_file :image, 
                    :styles => { :default => "244x244#" },
                    :storage => :s3,
                    :s3_credentials => {
                      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                    },
                    :s3_protocol => 'https',
                    :default_url => '/assets/default-avatar.jpg',
                    :bucket => ENV['S3_BUCKET']
  def last_name
    name.sub(/, \w+$/, "").split(" ").last
  end
end
