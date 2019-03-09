class AttendancesController < ApplicationController
  before_action :set_attendance, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /attendances
  def index
    @attendances = Attendance.all

    render json: @attendances
  end

  # GET /attendances/1
  def show
    render json: @attendance
  end

  # POST /attendances
  def create
    course = Course.find(params[:course_id])
    unless course.admins.include? current_user.id.to_s
      output = {error: "Not an instrucor"}.to_json
      render :json => output
      return
    end

    unless Attendance.find_by(course_id: params[:course_id], open: true).nil?
      output = {error: "Attendance already open"}.to_json
      render :json => output
      return
    end
    
    @attendance = Attendance.new(attendance_params)

    code = SecureRandom.base64;

    @attendance.code = code
    @attendance.open = true

    if @attendance.save

      ActionCable.server.broadcast "course:#{@attendance.course_id}_channel", status: 'open_attendance'

      render json: @attendance, status: :created, location: @attendance
    else
      render json: @attendance.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /attendances/1
  def update
    if @attendance.update(attendance_params)
      render json: @attendance
    else
      render json: @attendance.errors, status: :unprocessable_entity
    end
  end

  # DELETE /attendances/1
  def destroy
    @attendance.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_attendance
      @attendance = Attendance.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def attendance_params
      params.require(:attendance).permit(:date, :course_id, :latitude, :longitude)
    end
end
