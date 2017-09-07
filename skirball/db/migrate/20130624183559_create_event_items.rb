class CreateEventItems < ActiveRecord::Migration
  def change
    create_table :event_items do |t|
      t.integer :event_id
      t.integer :cart_id
      t.integer :quantity, :default => 1

      t.timestamps
    end
  end
end
