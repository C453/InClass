class QuestionsController < ApplicationController
  before_action :set_question, only: [:show, :update, :destroy]
  # before_action :authenticate_user!

  # GET /questions
  def index
    params.require(:course)
    @questions = Course.find(params[:course]).questions

    render json: @questions
  end

  # GET /questions/1
  def show
    render json: @question
  end

  # POST /questions
  def create
    @question = Question.new(question_params)

    if @question.save

      ActionCable.server.broadcast "course:#{@question.course.id}_channel", status: 'new_question',
        id: @question.id,
        user_id: @question.user.id,
        question: @question.question,
        yeah_count: @question.yeah_count,
        course_id: @question.course.id,
        answered: @question.answered,
        created_at: @question.created_at,
        updated_at: @question.updated_at

      render json: @question, status: :created, location: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /questions/1
  def update
    if @question.update(question_params)
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /questions/1
  def destroy
    @question.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def question_params
      params.require(:question).permit(:user_id, :question, :yeah_count, :course_id, :answered)
    end
end
