class AddPublicToSlides < ActiveRecord::Migration[5.2]
  def change
    add_column :slides, :public, :boolean
  end
end
