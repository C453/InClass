class YeahQuestionController < ApplicationController
before_action :authenticate_user!

  def yeah
		params.require(:question)
		question = Question.find(params[:question])
		
		if question.yeahs.include? current_user.id.to_s
			question.yeahs.delete(current_user.id.to_s)
			question.yeah_count = question.yeah_count - 1;
		else
			question.yeahs << current_user.id.to_s
			question.yeah_count = question.yeah_count + 1;
		end

		if question.save!
			output = {'status' => 'success'}.to_json
			
			ActionCable.server.broadcast "course:#{question.course.id}_channel", status: 'yeah',
			id: question.id,
			yeah_count: question.yeah_count
		else
			output = {'status' => 'error'}.to_json
		end
		
		render :json => output
	end

	def answer_question
		params.require(:question)

		question = Question.find(params[:question])

		question.answered = true

		if question.save!
			output = {'status' => 'success'}.to_json
			
			ActionCable.server.broadcast "course:#{question.course.id}_channel", status: 'question_answered',
			id: question.id
		else
			output = {'status' => 'error'}.to_json
		end
	end
end
