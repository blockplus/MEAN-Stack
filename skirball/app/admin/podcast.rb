ActiveAdmin.register Podcast do
  menu parent: 'Content', priority: 15
  
  form do |f|
    f.inputs :title, :subtitle, :keywords, :file, :itunes_url, :notes
    f.actions
  end
  
  index do
    selectable_column
    column :title
    column :keywords
    column "File Name", :file_file_name
    column :published_on
    default_actions
  end
  
  show do |podcast|
    attributes_table do
      row :title
      row :subtitle
      row :keywords
      row :itunes_url
      row :notes
      row :file_name do
        podcast.file_file_name
      end
      row :listen do
        content_tag :audio, nil, src: podcast.file.url
      end
    end
    script do
      "audiojs.events.ready(function() {var as = audiojs.createAll();});"
    end
  end
end
