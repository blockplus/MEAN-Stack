class CreateTestimonials < ActiveRecord::Migration
  def change
    create_table :testimonials do |t|
      t.integer :teacher_id
      t.integer :account_id
      t.text :content

      t.timestamps
    end
  end
end
