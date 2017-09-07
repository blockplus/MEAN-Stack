class AddCouponIdToCarts < ActiveRecord::Migration
  def change
    add_column :carts, :coupon_id, :integer
  end
end
