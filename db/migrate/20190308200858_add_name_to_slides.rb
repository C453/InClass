class AddNameToSlides < ActiveRecord::Migration[5.2]
  def change
    add_column :slides, :name, :string
  end
end
