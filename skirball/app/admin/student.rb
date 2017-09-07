ActiveAdmin.register Student, as: 'Testimonial' do
  menu parent: 'Content'

  form do |f|
    f.inputs :name, :quote, :attribution, :image
    f.actions
  end

  index do
    selectable_column
    column :name
    column :quote
    column :created_at
    default_actions
  end

  show do |student|
    attributes_table do
      row :name
      row :quote
      row :attribution
      row :image do
        image_tag student.image.url(:default)
      end
    end
  end
end
