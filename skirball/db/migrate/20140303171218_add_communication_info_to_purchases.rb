class AddCommunicationInfoToPurchases < ActiveRecord::Migration
  def change
    add_column :purchases, :phone, :string
    add_column :purchases, :email, :string
    add_column :purchases, :contact_preference, :string
  end
end
