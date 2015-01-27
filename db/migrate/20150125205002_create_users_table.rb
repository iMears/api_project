class CreateUsersTable < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string  :first_name
      t.string  :last_name
      t.string  :birthday
      t.string  :gender
      t.string  :email
      t.string  :city
      t.string  :state
      t.string  :password_hash

      t.timestamps
    end
  end
end

