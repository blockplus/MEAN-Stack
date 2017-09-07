class AddFeeTypeToLineItems < ActiveRecord::Migration
  def up
    add_column :line_items, :fee_type, :integer
  end
  def down
    remove_column :line_items, :fee_type
  end
end
