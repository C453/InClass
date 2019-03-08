class CreateJoinTableAttendanceUsers < ActiveRecord::Migration[5.2]
  def change
    create_join_table :attendances, :users do |t|
      t.index [:attendance_id, :user_id]
      t.index [:user_id, :attendance_id]
    end
  end
end
