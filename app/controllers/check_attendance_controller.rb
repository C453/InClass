class CheckAttendanceController < ApplicationController
  # POST /check_attendance
  def check_attendance
    params.require(:course)

    course = Course.find(params[:course]);

    if course.nil?
      output = {status: "Course not found"}.to_json
    else
      # find any open attendances

      open = !Attendance.find_by(course_id: course.id, open: true).nil?

      output = {status: open}.to_json 
    end

    render :json => output
  end
end
