class AddLocationToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :location_id, :integer
  end
end
