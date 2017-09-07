class RemoveLocationIdFromCourses < ActiveRecord::Migration
  def up
    remove_column :courses, :location_id
  end

  def down
    add_column :courses, :location_id, :integer
  end
end
