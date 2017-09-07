class CreateCatalogs < ActiveRecord::Migration
  def change
    create_table :catalogs do |t|
      t.string :link
      t.text :embed_code
      t.attachment :image

      t.timestamps
    end
  end
end
