class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :name
      t.string :quote
      t.string :attribution
      t.attachment :image

      t.timestamps
    end
  end
end
