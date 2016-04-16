class AddAnimatedToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :animated, :boolean
  end
end
