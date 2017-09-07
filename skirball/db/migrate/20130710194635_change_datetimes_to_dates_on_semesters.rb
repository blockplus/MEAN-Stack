class ChangeDatetimesToDatesOnSemesters < ActiveRecord::Migration
  def up
    change_column :semesters, :starts_at, :date
    change_column :semesters, :ends_at, :date
    change_column :semesters, :early_bird_ends_at, :date
  end

  def down
    change_column :semesters, :starts_at, :datetime
    change_column :semesters, :ends_at, :datetime
    change_column :semesters, :early_bird_ends_at, :datetime
  end
end
