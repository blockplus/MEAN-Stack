class CreateAccountDonations < ActiveRecord::Migration
  def change
    create_table :account_donations do |t|
      t.integer :donation_id
      t.integer :purchase_id
      t.integer :account_id

      t.timestamps
    end
  end
end
