class ChangePurchaseAdditionalAttendeesToText < ActiveRecord::Migration
  def up
    change_column :purchases, :additional_attendees, :text, limit: nil
  end

  def down
    change_column :purchases, :additional_attendees, :string
  end
end
