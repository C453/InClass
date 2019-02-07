class GetCoursesController < ApplicationController
  before_action :authenticate_user!

  def get_courses
    render :json => current_user.courses.to_json
  end

  def get_owned_courses
    render :json => Course.where("'#{current_user.id}' = ANY (admins)")
  end
end
