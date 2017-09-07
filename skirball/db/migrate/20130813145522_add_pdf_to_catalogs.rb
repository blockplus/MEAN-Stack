class AddPdfToCatalogs < ActiveRecord::Migration
  def change
    change_table :catalogs do |t|
      t.attachment :pdf
    end
  end
end
