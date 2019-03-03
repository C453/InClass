class AddCodeToAttendances < ActiveRecord::Migration[5.2]
  def change
    add_column :attendances, :code, :string
  end
end
