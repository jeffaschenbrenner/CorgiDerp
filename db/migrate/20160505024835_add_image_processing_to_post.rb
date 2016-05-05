class AddImageProcessingToPost < ActiveRecord::Migration
  def change
    add_column :posts, :image_processing, :boolean
  end
end
