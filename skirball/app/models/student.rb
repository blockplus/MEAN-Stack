class Student < ActiveRecord::Base
  attr_accessible :name, :attribution, :quote, :image
  has_attached_file :image, 
                    :styles => { :default => "244x244#" },
                    :storage => :s3,
                    :s3_credentials => {
                      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                    },
                    :s3_protocol => 'https',
                    :default_url => '/assets/default.png',
                    :bucket => ENV['S3_BUCKET']
end
