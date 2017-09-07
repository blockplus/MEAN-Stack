class AddKeywordsSubtitlesAndGuidsToPodcasts < ActiveRecord::Migration
  def change
    add_column :podcasts, :keywords, :string
    add_column :podcasts, :subtitle, :string
    add_column :podcasts, :guid, :string
  end
end
