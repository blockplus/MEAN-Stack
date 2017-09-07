class ChangeDiscountFeesOnCourses < ActiveRecord::Migration
  def up
    change_column :courses, :temple_member_discount_fee, :decimal, :default =>0
  end

  def down
    change_column :courses, :temple_member_discount_fee, :decimal
  end
end
