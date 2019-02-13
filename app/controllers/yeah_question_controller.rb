class YeahQuestionController < ApplicationController
before_action :authenticate_user!

  def yeah
		params.require(:question)
		question = Question.find(params[:question])
		
		unless question.yeahs.include? current_user.id.to_s
			question.yeahs << current_user.id.to_s
			question.yeah_count = question.yeah_count + 1;
			
			if question.save!
				output = {'status' => 'success'}.to_json
				
				ActionCable.server.broadcast "course:#{question.course.id}_channel", status: 'yeah',
				id: question.id,
				yeah_count: question.yeah_count
			else
				output = {'status' => 'error'}.to_json
			end
		else
			output = {'status' => 'User Already Yeah'}.to_json
		end
			
		
		render :json => output
	end
	
	def unyeah
		params.require(:question)
		question = Question.find(params[:question])
		
		if question.yeahs.include? current_user.id.to_s
			question.yeahs.delete(current_user.id.to_s)
			question.yeah_count = question.yeah_count - 1;
			
			if question.save!
				output = {'status' => 'success'}.to_json
				
				ActionCable.server.broadcast "course:#{question.course.id}_channel", status: 'yeah',
				id: question.id,
				yeah_count: question.yeah_count
			else
				output = {'status' => 'error'}.to_json
			end
		else
			output = {'status' => 'User has not yeah'}.to_json
		end
			
		
		render :json => output
  end
end
