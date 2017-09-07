class Admin::UploadsController < ApplicationController
  def create
    s3 = AWS::S3.new
    bucket = s3.buckets[ENV['S3_BUCKET']]
    object = bucket.objects["public/#{params['file'].original_filename}"].write(file: params['file'].tempfile, acl: :public_read)
    render json: {filelink: object.public_url.to_s}
    # logger.info params["file"].tempfile
    # head :bad_request
  end
end