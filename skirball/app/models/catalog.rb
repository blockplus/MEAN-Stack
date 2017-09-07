class Catalog < ActiveRecord::Base
  attr_accessible :title, :embed_code, :image, :pdf

  has_attached_file :image, 
                    :styles => { :default => "200x364#" },
                    :storage => :s3,
                    :s3_credentials => {
                      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                    },
                    :s3_protocol => 'https',
                    :default_url => '/assets/guide.jpg',
                    :bucket => ENV['S3_BUCKET']
  has_attached_file :pdf,
                    :storage => :s3,
                    :s3_credentials => {
                      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                    },
                    :s3_protocol => 'https',
                    :bucket => ENV['S3_BUCKET']

  def download_link
    pdf.s3_object.url_for(:get, :response_content_disposition => "attachment").to_s
  end
end
