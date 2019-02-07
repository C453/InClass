class AddStatusToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :status, :boolean
  end
end
