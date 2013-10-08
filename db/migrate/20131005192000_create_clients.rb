class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :login,   null: false
      t.string :address

      t.timestamps
    end
    add_index :clients, :login
  end
end
