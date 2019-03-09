class AddLatitudeToAttendances < ActiveRecord::Migration[5.2]
  def change
    add_column :attendances, :latitude, :decimal
    add_column :attendances, :longitude, :decimal
  end
end