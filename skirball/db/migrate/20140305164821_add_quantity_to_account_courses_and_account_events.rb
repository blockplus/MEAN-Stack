class AddQuantityToAccountCoursesAndAccountEvents < ActiveRecord::Migration
  def change
    add_column :account_courses, :quantity, :integer
    add_column :account_events, :quantity, :integer

    add_column :account_courses, :additional_attendees, :string
    add_column :account_events, :additional_attendees, :string
  end
end
