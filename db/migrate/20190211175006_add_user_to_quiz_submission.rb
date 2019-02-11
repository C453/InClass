class AddUserToQuizSubmission < ActiveRecord::Migration[5.2]
  def change
    add_reference :quiz_submissions, :user, foreign_key: true
  end
end
