class AddMoreUserData < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :username, :string
    add_column :users, :token, :string
    add_column :users, :refresh_token, :string
  end
end
