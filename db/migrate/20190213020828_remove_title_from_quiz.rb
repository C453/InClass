class RemoveTitleFromQuiz < ActiveRecord::Migration[5.2]
  def change
    remove_column :quizzes, :title, :string
  end
end
