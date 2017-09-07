class AddSlugsForFriendlyId < ActiveRecord::Migration
  def change
    add_column :courses, :slug, :string
    add_column :events, :slug, :string
    add_column :news_items, :slug, :string
    add_column :podcasts, :slug, :string
    add_column :semesters, :slug, :string
    add_column :teachers, :slug, :string
    add_column :videos, :slug, :string

    [Course, Event, NewsItem, Podcast, Semester, Teacher, Video].each do |model|
      model.find_each(&:save)
    end
  end
end
