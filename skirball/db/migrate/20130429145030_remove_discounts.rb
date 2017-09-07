class RemoveDiscounts < ActiveRecord::Migration
  def up
    drop_table :discounts
  end

  def down
    create_table :discounts do |t|
      t.string :name
      t.string :rule
      t.decimal :amount
    
      t.timestamps
    end
  end
end
