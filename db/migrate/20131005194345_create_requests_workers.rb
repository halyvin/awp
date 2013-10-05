class CreateRequestsWorkers < ActiveRecord::Migration
  def change
    create_table :requests_workers do |t|
      t.references :request
      t.references :worker
    end
    add_index :requests_workers, :request_id
    add_index :requests_workers, :worker_id
  end
end
