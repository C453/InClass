class CreateQuizQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :quiz_questions do |t|
      t.string :question_text
      t.integer :possible_answers
      t.integer :correct_answer

      t.timestamps
    end
  end
end
