class AddQuizQuestionToQuizAnswers < ActiveRecord::Migration[5.2]
  def change
    add_reference :quiz_answers, :quiz_question, foreign_key: true
  end
end
