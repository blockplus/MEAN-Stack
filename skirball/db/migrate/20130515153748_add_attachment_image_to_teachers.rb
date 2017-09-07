class AddAttachmentImageToTeachers < ActiveRecord::Migration
  def self.up
    change_table :teachers do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :teachers, :image
  end
end
