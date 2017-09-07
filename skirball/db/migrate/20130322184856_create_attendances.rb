class CreateAttendances < ActiveRecord::Migration
  def change
    create_table :attendances do |t|
      t.integer :account_id
      t.integer :course_id

      t.timestamps
    end
  end
end
