class RemoveEarlyBirdsFromCourses < ActiveRecord::Migration
  def up
    remove_column :courses, :early_bird_ends_at
    remove_column :courses, :early_bird_cost
  end

  def down
    
    add_column :courses, :early_bird_cost, :decimal
    add_column :courses, :early_bird_ends_at, :datetime
  end


end
