class AddItunesMetadataToPodcasts < ActiveRecord::Migration
  def change
    add_column :podcasts, :duration, :string
    add_column :podcasts, :published_on, :datetime
  end
end
