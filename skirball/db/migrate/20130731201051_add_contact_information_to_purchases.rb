class AddContactInformationToPurchases < ActiveRecord::Migration
  def change
    add_column :purchases, :first_name, :string
    add_column :purchases, :last_name, :string
    add_column :purchases, :address, :string
    add_column :purchases, :address2, :string
    add_column :purchases, :city, :string
    add_column :purchases, :state, :string
    add_column :purchases, :zip, :string
  end
end
