class CreateQuizSubmissions < ActiveRecord::Migration[5.2]
  def change
    create_table :quiz_submissions do |t|
      t.integer :score

      t.timestamps
    end
  end
end
