class TakeAttendanceController < ApplicationController
    before_action :authenticate_user!

    # POST /take_attendance
    def take_attendance
        params.require(:course, :code)

        course = Course.find(params[:course])
        user = current_user

        attendance = Attendance.find_by(course_id: params[:course], open: true)
        
        if attendance == nil
            output = {'status' => 'attendance_closed'}.to_json
        else
            unless attendance.users.include? current_user
                attendance.users.push(current_user)
                output = {'status' => 'success'}.to_json

                ActionCable.server.broadcast "course:#{attendance.course_id}_channel", status: 'attendance'
            else
                output = {'status' => 'already marked present'}.to_json
            end
        end
        
        render :json => output
    end
end
