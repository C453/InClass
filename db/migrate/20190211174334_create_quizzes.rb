class CreateQuizzes < ActiveRecord::Migration[5.2]
  def change
    create_table :quizzes do |t|
      t.boolean :status
      t.string :title

      t.timestamps
    end
  end
end
