class AddAttachmentFileToPodcasts < ActiveRecord::Migration
  def self.up
    change_table :podcasts do |t|
      t.attachment :file
    end
  end

  def self.down
    drop_attached_file :podcasts, :file
  end
end
