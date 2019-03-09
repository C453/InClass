class AddFileContentTypeToSlides < ActiveRecord::Migration[5.2]
  def change
    add_column :slides, :file_content_type, :varchar
  end
end
