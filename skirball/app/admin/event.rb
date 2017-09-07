ActiveAdmin.register Event do
  menu parent: 'Content'

  scope :live, :default => true
  scope :archived
  scope :all

  batch_action :archive do |selection|
    Event.find(selection).each do |event|
      event.update_attribute(:archived, true)
    end
    redirect_to :back
  end

  batch_action :unarchive do |selection|
    Event.find(selection).each do |event|
      event.update_attribute(:archived, false)
    end
    redirect_to :back
  end

  action_item :only => [:show, :edit] do
    link_to "View Event", event_url(event)
    if event.archived?
      link_to "Unarchive", admin_event_path(event.id, event: {:archived => false}), :method => :put
    else
      link_to "Archive", admin_event_path(event.id, event: { :archived => true }), :method => :put
    end
  end
  
  
  index do
    selectable_column
    column :title
    column :price
    column :description
    column :time
    column :date
    default_actions
  end
  
  form partial: 'form'

  show do |event|
    attributes_table do
      row :title
      row :price
      row :preview
      row :description
      row :location
      row :time
      row :date
    end
  end
end
