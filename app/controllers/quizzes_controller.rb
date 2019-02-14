class QuizzesController < ApplicationController
  before_action :set_quiz, only: [:show, :update, :destroy]

  # GET /quizzes
  def index
    @quizzes = Quiz.all

    render json: @quizzes
  end

  # GET /quizzes/1
  def show
    render json: @quiz
  end

  # POST /quizzes
  def create
    @quiz = Quiz.new(quiz_params)
    puts quiz_params
    if @quiz.save
      ActionCable.server.broadcast "add_quiz_channel", status: 'saved',
      id: @quiz.id,
      status: @quiz.status,
      course_id: @quiz.course_id

      render json: @quiz, status: :created, location: @quiz
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /quizzes/1
  def update
    if @quiz.update(quiz_params)
      render json: @quiz
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  # DELETE /quizzes/1
  def destroy
    @quiz.destroy
  end

  def get_active_quiz
    @active_quiz = Quiz.find_by(course_id: params[:course_id], status: true)
    render json: @active_quiz
  end

  def close_quiz
    @quiz = Quiz.find_by(id: params[:id])
    @quiz.status = false
    
    if @quiz.save
      ActionCable.server.broadcast "close_quiz_channel", status: 'saved',
      id: @quiz.id,
      status: @quiz.status,
      course_id: @quiz.course_id

      render json: @quiz, status: :created, location: @quiz
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quiz
      @quiz = Quiz.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def quiz_params
      params.require(:quiz).permit(:status, :course_id)
    end
end
