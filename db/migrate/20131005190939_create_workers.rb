class CreateWorkers < ActiveRecord::Migration
  def change
    create_table :workers do |t|
      t.string :name
      t.string :email
      t.string :phonenum

      t.timestamps
    end
  end
end
