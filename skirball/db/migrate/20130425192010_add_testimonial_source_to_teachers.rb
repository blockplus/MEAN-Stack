class AddTestimonialSourceToTeachers < ActiveRecord::Migration
  def change
    add_column :teachers, :testimonial_source, :string
  end
end
