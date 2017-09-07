class Slide < ActiveRecord::Base
  default_scope order('sort_order ASC')
  attr_accessible :image, :link, :title, :sort_order
  has_attached_file :image, 
                    :styles => { :default => "329x329>" },
                    :storage => :s3,
                    :s3_credentials => {
                      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                    },
                    :s3_protocol => 'https',
                    :default_url => '/assets/default.png',
                    :bucket => ENV['S3_BUCKET']
  after_initialize :init

  def init
    self.sort_order ||= Slide.count + 1
  end

end
