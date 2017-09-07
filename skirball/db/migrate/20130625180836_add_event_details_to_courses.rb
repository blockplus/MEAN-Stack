class AddEventDetailsToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :day_of_week, :string
    add_column :courses, :time_of_day, :string
    add_column :courses, :location_id, :integer
  end
end
