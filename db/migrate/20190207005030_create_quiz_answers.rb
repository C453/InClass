class CreateQuizAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :quiz_answers do |t|
      t.string :text
      t.boolean :correct

      t.timestamps
    end
  end
end
