class CreateSuggestedDonations < ActiveRecord::Migration
  def change
    create_table :suggested_donations do |t|
      t.string :title
      t.decimal :amount

      t.timestamps
    end
  end
end
