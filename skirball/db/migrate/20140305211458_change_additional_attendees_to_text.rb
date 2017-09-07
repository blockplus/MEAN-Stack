class ChangeAdditionalAttendeesToText < ActiveRecord::Migration
  def up
    change_column :account_courses, :additional_attendees, :text, limit: nil
    change_column :account_events, :additional_attendees, :text, limit: nil
  end

  def down
    change_column :account_courses, :additional_attendees, :string
    change_column :account_events, :additional_attendees, :string
  end
end
