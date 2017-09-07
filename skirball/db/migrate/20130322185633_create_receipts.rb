class CreateReceipts < ActiveRecord::Migration
  def change
    create_table :receipts do |t|
      t.string :title
      t.integer :amount
      t.text :description
      t.integer :purchase_id

      t.timestamps
    end
  end
end
