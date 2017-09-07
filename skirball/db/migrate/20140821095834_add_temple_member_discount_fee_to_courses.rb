class AddTempleMemberDiscountFeeToCourses < ActiveRecord::Migration

  def up
    add_column :courses, :temple_member_discount_fee, :decimal
  end
  def down
    remove_column :courses, :temple_member_discount_fee
  end
end
