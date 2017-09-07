class AddDurationToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :end_time, :string
    rename_column :courses, :time_of_day, :start_time
  end
end
