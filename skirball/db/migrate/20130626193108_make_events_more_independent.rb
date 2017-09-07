class MakeEventsMoreIndependent < ActiveRecord::Migration
  def up
    change_table :events do |t|
      t.remove :course_id, :starts_at, :ends_at, :day_of_week
      t.rename :time_of_day, :time
      t.date :date
    end
  end

  def down
    change_table :events do |t|
      t.string :day_of_week
      t.datetime :starts_at
      t.datetime :ends_at
      t.integer :course_id
      t.rename :time, :time_of_day
      t.remove :date
    end
  end
end
