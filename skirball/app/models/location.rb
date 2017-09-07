class Location < ActiveRecord::Base
  attr_accessible :address, :title
  has_many :events
end
