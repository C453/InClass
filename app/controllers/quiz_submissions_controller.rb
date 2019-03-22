class QuizSubmissionsController < ApplicationController
  before_action :set_quiz_submission, only: [:show, :update, :destroy]

  # GET /quiz_submissions
  def index
    @quiz_submissions = QuizSubmission.all

    render json: @quiz_submissions
  end

  # GET /quiz_submissions/1
  def show
    render json: @quiz_submission
  end

  # POST /quiz_submissions
  def create
    if !QuizSubmission.where(user_id: current_user.id, quiz_id: params[:quiz_id]).exists?
      @quiz_submission = QuizSubmission.new(quiz_submission_params)
      @quiz_submission.user_id = current_user.id

      if @quiz_submission.save
        render json: @quiz_submission, status: :created, location: @quiz_submission
      else
        render json: @quiz_submission.errors, status: :unprocessable_entity
      end
    else
      puts QuizSubmission.where(user_id: current_user.id, quiz_id: params[:quiz_id])
      update_quiz
    end
  end

  def get_quiz_submissions
    @quiz_sub = QuizSubmission.where(quiz_id: params[:quiz_id], course_id: params[:course_id])
    render json: @quiz_sub
  end

  # PATCH/PUT /quiz_submissions/1
  def update_quiz
    @quiz_submission = QuizSubmission.where(user_id: current_user.id, quiz_id: params[:quiz_id])
    if @quiz_submission.update(quiz_submission_params)
      render json: @quiz_submission, status: :not_found
    else
      render json: @quiz_submission.errors, status: :unprocessable_entity
    end
  end

  # DELETE /quiz_submissions/1
  def destroy
    @quiz_submission.destroy
  end

  private
    

    # Use callbacks to share common setup or constraints between actions.
    def set_quiz_submission
      @quiz_submission = QuizSubmission.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def quiz_submission_params
      params.require(:quiz_submission).permit(:score, :quiz_id, :course_id)
    end
end
