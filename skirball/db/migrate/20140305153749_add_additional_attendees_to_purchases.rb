class AddAdditionalAttendeesToPurchases < ActiveRecord::Migration
  def change
    add_column :purchases, :additional_attendees, :string
  end
end
