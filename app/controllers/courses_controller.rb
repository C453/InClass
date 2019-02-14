class CoursesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course, only: [:show, :update, :destroy]

  # GET /courses
  def index
    @courses = Course.all

    render json: @courses
  end

  # GET /courses/1
  def show
    render json: @course
  end

  # POST /courses
  def create
    @course = Course.new(course_params)
    @course.code = SecureRandom.hex[0..6]
    @course.admins << current_user.id

    if @course.save

      ActionCable.server.broadcast "courses:#{current_user.id}_channel", status: 'create',
        id: @course.id,
        name: @course.name,
        code: @course.code,
        admin: @course.admins.include?(current_user.id.to_s)

      render json: @course, status: :created, location: @course
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /courses/1
  def update
    if @course.update(course_params)
      render json: @course
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  # DELETE /courses/1
  def destroy
    @course.destroy

    ActionCable.server.broadcast "courses:#{current_user.id}_channel", status: 'deleted', id: id
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_course
      @course = Course.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def course_params
      params.require(:course).permit(:name, :expires)
    end
end
