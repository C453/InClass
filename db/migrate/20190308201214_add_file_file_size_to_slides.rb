class AddFileFileSizeToSlides < ActiveRecord::Migration[5.2]
  def change
    add_column :slides, :file_file_size, :int8
  end
end
