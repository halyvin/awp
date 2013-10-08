class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.references :user,   null: false
      t.references :client
      t.boolean :closed,    null: false, default: false
      t.string :body
      t.date :day,          null: false
      t.string :time
      t.string :close_reason

      t.timestamps
    end
    add_index :requests, :user_id
    add_index :requests, :client_id
    add_index :requests, :closed
    add_index :requests, :day
  end
end
