class AddYeahsToQuestion < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :yeahs, :string, array: true, :default => []
  end
end
