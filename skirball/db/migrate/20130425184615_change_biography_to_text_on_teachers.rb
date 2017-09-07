class ChangeBiographyToTextOnTeachers < ActiveRecord::Migration
  def up
    change_column(:teachers, :biography, :text)
  end

  def down
    change_column(:teachers, :biography, :string)
  end
end
