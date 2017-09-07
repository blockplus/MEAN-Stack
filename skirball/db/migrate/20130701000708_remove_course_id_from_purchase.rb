class RemoveCourseIdFromPurchase < ActiveRecord::Migration
  def up
    remove_column :purchases, :course_id
  end

  def down
    add_column :purchases, :course_id, :integer
  end
end
