class AddCourseToQuizSubmission < ActiveRecord::Migration[5.2]
  def change
    add_reference :quiz_submissions, :course, foreign_key: true
  end
end
