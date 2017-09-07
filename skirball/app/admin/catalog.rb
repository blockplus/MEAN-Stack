ActiveAdmin.register Catalog do
  menu parent: 'Content', priority: 25

  form do |f|
    f.inputs :title, :embed_code, :pdf, :image
    f.actions
  end

  index do 
    selectable_column
    column :title
    column :created_at
    default_actions
  end

  show do |catalog|
    attributes_table do
      row :title
      row :image do
        image_tag catalog.image.url(:default)
      end
      row :preview do
        catalog.embed_code.html_safe
      end
    end
  end
end

