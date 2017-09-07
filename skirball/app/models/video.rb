class Video < ActiveRecord::Base
  extend FriendlyId
  attr_accessible :description, :embed_code, :title, :slug
  friendly_id :title, :use => :slugged
  searchable do
    text :title, :boost => 3
    text :description
  end
end
