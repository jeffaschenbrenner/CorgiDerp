class RemoveFlagIdFromFlagTypes < ActiveRecord::Migration
  def change
    remove_column :flag_types, :flag_id, :integer
  end
end
