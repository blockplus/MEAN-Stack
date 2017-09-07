ActiveAdmin.register Video do
  menu parent: 'Content', priority: 20
  
  form do |f|
    f.inputs :title, :description, :embed_code
    f.actions
  end
  
  index do
    selectable_column
    column :title
    column :description
    column :created_at
    column :updated_at
    default_actions
  end
  
  show do |video|
    attributes_table do
      row :description
      row :watch do
        video.embed_code.html_safe
      end
    end
  end
    
end