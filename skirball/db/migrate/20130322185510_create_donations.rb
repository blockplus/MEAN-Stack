class CreateDonations < ActiveRecord::Migration
  def change
    create_table :donations do |t|
      t.integer :account_id
      t.decimal :amount
      t.integer :cart_id

      t.timestamps
    end
  end
end
