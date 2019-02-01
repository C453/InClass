class AddAdminsToCourse < ActiveRecord::Migration[5.2]
  def change
    add_column :courses, :admins, :string, array: true, :default => []
  end
end
