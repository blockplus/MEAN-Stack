class AddReferenceAndReceiptToPurchase < ActiveRecord::Migration
  def change
    add_column :purchases, :reference, :string
    add_column :purchases, :receipt, :text
  end
end
