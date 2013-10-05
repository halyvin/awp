# -*- encoding : utf-8 -*-
class CreateWorkers < ActiveRecord::Migration
  def migrate(direction)
    super
    Worker.create([
      { name: "Толик" },
      { name: "Ванька" },
      { name: "Тюбик" },
      { name: "Парасенка" },
      { name: "Клон" },
      { name: "Слон" },
      { name: "Яша" },
      { name: "Кислый" },
      { name: "Паха" },
      { name: "Леха" },
      { name: "Серп" }
    ])
  end

  def change
    create_table :workers do |t|
      t.string :name

      t.timestamps
    end
  end
end
