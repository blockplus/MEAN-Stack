class CreatePurchases < ActiveRecord::Migration
  def change
    create_table :purchases do |t|
      t.integer :account_id
      t.integer :course_id

      t.timestamps
    end
  end
end
