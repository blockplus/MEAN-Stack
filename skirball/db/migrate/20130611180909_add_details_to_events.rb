class AddDetailsToEvents < ActiveRecord::Migration
  def change
    add_column :events, :day_of_week, :integer
    add_column :events, :time_of_day, :string
    add_column :events, :location_id, :integer
  end
end
