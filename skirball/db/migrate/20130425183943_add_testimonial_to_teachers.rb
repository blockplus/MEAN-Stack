class AddTestimonialToTeachers < ActiveRecord::Migration
  def change
    add_column :teachers, :testimonial, :text
  end
end
