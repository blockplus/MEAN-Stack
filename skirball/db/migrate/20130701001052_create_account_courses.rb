class CreateAccountCourses < ActiveRecord::Migration
  def change
    create_table :account_courses do |t|
      t.integer :course_id
      t.integer :purchase_id
      t.integer :account_id

      t.timestamps
    end
  end
end
