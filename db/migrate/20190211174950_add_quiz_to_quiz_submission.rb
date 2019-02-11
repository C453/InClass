class AddQuizToQuizSubmission < ActiveRecord::Migration[5.2]
  def change
    add_reference :quiz_submissions, :quiz, foreign_key: true
  end
end
