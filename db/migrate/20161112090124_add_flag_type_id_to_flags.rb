class AddFlagTypeIdToFlags < ActiveRecord::Migration
  def change
    add_column :flags, :flag_type_id, :integer
  end
end
