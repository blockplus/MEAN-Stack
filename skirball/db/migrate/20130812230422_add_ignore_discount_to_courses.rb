class AddIgnoreDiscountToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :ignore_discount, :boolean, :default => false
  end
end
