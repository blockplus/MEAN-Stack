class CreateAccountEvents < ActiveRecord::Migration
  def change
    create_table :account_events do |t|
      t.integer :event_id
      t.integer :purchase_id
      t.integer :account_id

      t.timestamps
    end
  end
end
