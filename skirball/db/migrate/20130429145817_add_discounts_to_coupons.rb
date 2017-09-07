class AddDiscountsToCoupons < ActiveRecord::Migration
  def change
    add_column :coupons, :rule, :string
    add_column :coupons, :amount, :decimal
  end
end
