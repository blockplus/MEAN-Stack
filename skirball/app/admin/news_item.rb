ActiveAdmin.register NewsItem do
  menu parent: 'Content', priority: 10

  scope :live, :default => true
  scope :archived
  scope :all

  batch_action :archive do |selection|
    NewsItem.find(selection).each do |news_item|
      news_item.update_attribute(:archived, true)
    end
    redirect_to :back
  end

  batch_action :unarchive do |selection|
    NewsItem.find(selection).each do |news_item|
      news_item.update_attribute(:archived, false)
    end
    redirect_to :back
  end

  action_item :only => [:show, :edit] do
    link_to "View News Item", news_item_url(news_item)
    if news_item.archived?
      link_to "Unarchive", admin_news_item_path(news_item.id, news_item: {:archived => false}), :method => :put
    else
      link_to "Archive", admin_news_item_path(news_item.id, news_item: { :archived => true }), :method => :put
    end
  end
  
  index do
    selectable_column
    column :title
    column :url do |item|
      link_to item.url, item.url
    end
    column :description
    column :created_at
    default_actions
  end
  
  show do |item|
    attributes_table do
      row :title
      row :url do
        link_to item.url, item.url
      end
      row :preview
      row :description
      row :created_at
      row :updated_at
    end
  end
end
