class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.references :user, foreign_key: true
      t.text :question
      t.integer :yeah_count
      t.references :course, foreign_key: true
      t.boolean :answered

      t.timestamps
    end
  end
end
