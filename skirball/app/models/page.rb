class Page < ActiveRecord::Base
  extend FriendlyId
  attr_accessible :content, :slug, :title
  friendly_id :title, use: :slugged
  searchable do 
    text :title, :boost => 3
    text :content
  end
end
