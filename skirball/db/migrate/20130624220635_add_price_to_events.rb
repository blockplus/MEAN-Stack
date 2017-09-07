class AddPriceToEvents < ActiveRecord::Migration
  def change
    add_column :events, :price, :decimal
  end
end
