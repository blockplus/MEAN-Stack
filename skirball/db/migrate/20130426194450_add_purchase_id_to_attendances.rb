class AddPurchaseIdToAttendances < ActiveRecord::Migration
  def change
    add_column :attendances, :purchase_id, :integer
  end
end
