class AddOpenToAttendance < ActiveRecord::Migration[5.2]
  def change
    add_column :attendances, :open, :boolean
  end
end
