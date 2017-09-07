class CreateDiscounts < ActiveRecord::Migration
  def change
    create_table :discounts do |t|
      t.string :name
      t.string :rule
      t.decimal :amount

      t.timestamps
    end
  end
end
