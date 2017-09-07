class NewsItem < ActiveRecord::Base
  extend FriendlyId
  include Concerns::Archivable
  attr_accessible :description, :title, :url, :slug, :preview
  friendly_id :title, :use => :slugged
  default_scope order("created_at DESC")
  searchable :unless => :archived do
    text :title, :boost => 3
    text :description
  end
end
