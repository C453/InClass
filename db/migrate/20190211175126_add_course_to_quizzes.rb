class AddCourseToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_reference :quizzes, :course, foreign_key: true
  end
end
