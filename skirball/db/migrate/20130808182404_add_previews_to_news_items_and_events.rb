class AddPreviewsToNewsItemsAndEvents < ActiveRecord::Migration
  def change
    add_column :news_items, :preview, :text
    add_column :events, :preview, :text
  end
end
