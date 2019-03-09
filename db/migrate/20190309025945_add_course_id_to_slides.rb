class AddCourseIdToSlides < ActiveRecord::Migration[5.2]
  def change
    add_column :slides, :course_id, :integer
    add_column :slides, :file_name, :string
  end
end
