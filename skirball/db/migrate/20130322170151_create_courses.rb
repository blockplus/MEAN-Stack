class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :title
      t.text :description
      t.integer :teacher_id
      t.integer :semester_id
      t.decimal :cost
      t.string :state

      t.timestamps
    end
  end
end
