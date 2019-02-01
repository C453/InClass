class GetCoursesController < ApplicationController
  before_action :authenticate_user!

  def get_courses
    render :json => current_user.courses.to_json
  end
end
