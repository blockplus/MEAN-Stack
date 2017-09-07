class MakeModelsArchivable < ActiveRecord::Migration
  def change
    add_column :courses, :archived, :boolean, :default => false 
    add_column :semesters, :archived, :boolean, :default => false 
    add_column :teachers, :archived, :boolean, :default => false 
    add_column :news_items, :archived, :boolean, :default => false 
    add_column :events, :archived, :boolean, :default => false 
  end

end
