class AddItunesUrlToPodcasts < ActiveRecord::Migration
  def change
    add_column :podcasts, :itunes_url, :string
  end
end
