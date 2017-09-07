class RemoveCostFromCourse < ActiveRecord::Migration

  def up
    remove_column :courses, :cost
  end

  def down

    add_column :courses, :cost, :decimal
  end
end
