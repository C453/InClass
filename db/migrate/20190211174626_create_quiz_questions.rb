class CreateQuizQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :quiz_questions do |t|
      t.string :text
      t.string :answers, array: true, default: []
      t.integer :correct

      t.timestamps
    end
  end
end
