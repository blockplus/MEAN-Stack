ActiveAdmin.register Page do
  menu parent: 'Content', priority: 5
  form partial: 'form'
  
  filter :title
  filter :content
  filter :created_at
  filter :updated_at
  
  index do
    selectable_column
    column :title
    column :created_at
    column :updated_at
    default_actions
  end
  
  action_item :only => :show do
    link_to "View Page", page_url(page)
  end
  
  show do |page|
    div do
      simple_format page.content
    end
  end
end