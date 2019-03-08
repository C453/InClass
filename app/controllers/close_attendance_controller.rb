class CloseAttendanceController < ApplicationController
    before_action :authenticate_user!

    def close_attendance
        params.require(:course)

        course = Course.find(params[:course])
        
        if course.admins.include? current_user.id.to_s
            attendance = Attendance.find_by(course_id: params[:course], open: true)

            attendance.open = false
            attendance.save!

            ActionCable.server.broadcast "course:#{attendance.course_id}_channel", status: 'close_attendance'
        
            output = { status: 'success' }.to_json
        else
            output = { status: 'not allowed' }.to_json
        end

        render :json => output
    end
end
