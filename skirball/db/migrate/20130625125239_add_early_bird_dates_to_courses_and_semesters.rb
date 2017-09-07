class AddEarlyBirdDatesToCoursesAndSemesters < ActiveRecord::Migration
  def change
    add_column :semesters, :early_bird_ends_at, :datetime
    add_column :courses, :early_bird_ends_at, :datetime
  end
end
