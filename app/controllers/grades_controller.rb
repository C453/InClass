class GradesController < ApplicationController
  before_action :authenticate_user!
  
  def get_grade
    params.require(:course)

    course = Course.find(params[:course])

    unless course
      output = {"error": "course not found"}
      render :json => output.to_json
      return
    end

    output = { grades: {} }

    if course.admins.include? current_user.id.to_s
      attendances = []
      all_attendances = Attendance.where(course_id: params[:course])

      all_attendances.each do |a|
        users = []

        a.users.each do |u|
          users.push({name: u.name, signed_in: true})
        end

        course.users.each do |u|
          if(users.select{|e| e.has_value?(u.name)}.empty?)
            users.push({name: u.name, signed_in: false})
          end
        end

        attendances.push({date: a.date, users: users})
        output[:grades][:attendance] = attendances
      end
    else
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
        score = QuizSubmission.find_by(quiz_id: quiz.id, user_id: current_user)

        quiz_res[:questions] = questions
        quiz_res[:score] = score
        quizzes.push(quiz_res)
      end

      output[:grades][:attendance] = {}
      output[:grades][:attendance][:total_attendances] = total_attendances
      output[:grades][:attendance][:total_missed] = total_missed
      output[:grades][:attendance][:attendances] = attendances
      output[:grades][:quizzes] = quizzes
    end

    render :json => output.to_json

  end
end
