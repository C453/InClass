class GradesController < ApplicationController
  before_action :authenticate_user!
  
  def get_grade
    params.require(:course)

    output = { grades: {} }

    # get all attendance grades
    attendances = []

    all_attendances = Attendance.where(course_id: params[:course])

    total_missed = 0
    total_attendances = all_attendances.count


    all_attendances.each do |attendance|

      present = attendance.users.include? current_user

      unless present
        total_missed = total_missed + 1
      end

      att = {}
      att[:date] = attendance.date
      att[:present] = present
      attendances.push(att)
    end

    all_quizzes = Quiz.where(course_id: params[:course])

    quizzes = []

    all_quizzes.each do |quiz|
      quiz_res = {}
      questions = QuizQuestion.where(quiz_id: quiz.id)
      score = QuizSubmission.find_by(quiz_id: quiz.id, user_id: current_user.id)

      quiz_res[:questions] = questions
      quiz_res[:score] = score
      quizzes.push(quiz_res)
    end

    output[:grades][:attendance] = {}
    output[:grades][:attendance][:total_attendances] = total_attendances
    output[:grades][:attendance][:total_missed] = total_missed
    output[:grades][:attendance][:attendances] = attendances
    output[:grades][:quizzes] = quizzes

    render :json => output.to_json

  end
end
