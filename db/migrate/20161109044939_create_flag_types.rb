class CreateFlagTypes < ActiveRecord::Migration
  def change
    create_table :flag_types do |t|
      t.string :name
      t.references :flag, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
