class ChangeVideoUrlToEmbedCode < ActiveRecord::Migration
  def up
    change_column :videos, :url, :text
    rename_column :videos, :url, :embed_code
  end

  def down
    change_column :videos, :embed_code, :string
    change_column :videos, :embed_code, :url
  end
end
