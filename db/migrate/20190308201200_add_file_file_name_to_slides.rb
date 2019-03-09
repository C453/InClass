class AddFileFileNameToSlides < ActiveRecord::Migration[5.2]
  def change
    add_column :slides, :file_file_name, :varchar
  end
end
