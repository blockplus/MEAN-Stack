class ChangeUsernameToNameForAccounts < ActiveRecord::Migration
  def change
    rename_column(:accounts, :username, :name)
  end
end
