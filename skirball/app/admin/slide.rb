ActiveAdmin.register Slide do
  menu parent: 'Content'

  form do |f|
    f.inputs :title, :link, :sort_order, :image
    f.actions
  end

  show do |slide|
    attributes_table do
      row :title
      row :link
      row :sort_order
      row :image do
        image_tag slide.image.url(:default)
      end
    end
  end

end
