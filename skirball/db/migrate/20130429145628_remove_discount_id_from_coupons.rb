class RemoveDiscountIdFromCoupons < ActiveRecord::Migration
  def up
    remove_column :coupons, :discount_id
  end

  def down
    add_column :coupons, :discount_id, :integer
  end
end
