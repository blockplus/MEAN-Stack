class ChangeDayOfWeekTypeForEvents < ActiveRecord::Migration
  def up
    change_column :events, :day_of_week, :string
  end

  def down
    change_column :events, :day_of_week, :integer
  end
end
