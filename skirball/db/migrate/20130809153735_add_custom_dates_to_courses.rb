class AddCustomDatesToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :custom_dates, :string
  end
end
