class AddTotalToPurchases < ActiveRecord::Migration
  def change
    add_column :purchases, :total, :decimal
  end
end
