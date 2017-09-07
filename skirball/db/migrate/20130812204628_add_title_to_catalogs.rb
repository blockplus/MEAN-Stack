class AddTitleToCatalogs < ActiveRecord::Migration
  def change
    add_column :catalogs, :title, :string
  end
end
