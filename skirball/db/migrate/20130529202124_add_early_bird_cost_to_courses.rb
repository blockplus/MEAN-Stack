class AddEarlyBirdCostToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :early_bird_cost, :decimal
  end
end
