class RemoveCodeFromCoupons < ActiveRecord::Migration
  def up
    remove_column :coupons, :code
  end

  def down
    add_column :coupons, :code, :string
  end
end
