class AddCourseToDocuments < ActiveRecord::Migration[5.2]
  def change
    add_reference :documents, :course, foreign_key: true
  end
end
