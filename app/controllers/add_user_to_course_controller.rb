class AddUserToCourseController < ApplicationController
  before_action :authenticate_user!

  def register_course

    unless Course.where(code: params[:code]).empty?
      course = Course.find_by(code: params[:code])
      user = current_user

      if course.users.include? user
        output = {'status' => 'User Already Added'}.to_json
      else
        course.users.push user
        course.save!

        ActionCable.server.broadcast "add_course:#{current_user.id}_channel", status: 'saved',
        id: course.id,
        name: course.name

        output = {'status' => 'success'}.to_json
      end
    else
      output = {'status' => 'Course Not Found'}.to_json
    end

    render :json => output
  end

  # POST /drop_course
  def drop_course
    unless Course.where(code: params[:code]).empty?
      course = Course.find_by(code: params[:code])
      current_user.courses.delete(course)
      output = {'status' => 'success'}.to_json
    else
      output = {'status' => 'Course Not Found'}.to_json
    end

    render :json => output
  end

  def add_user_to_course_params
    params.permit(:code)
  end
end
