class AddCourseChannel < ApplicationCable::Channel
  def subscribed
     stream_from "add_course:#{params['user_id']}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
