class AddColumnsToFlag < ActiveRecord::Migration
  def change
    add_column :flags, :status, :string, default: 'pending'
    add_column :flags, :comment, :text
  end
end
