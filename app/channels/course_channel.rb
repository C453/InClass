class CourseChannel < ApplicationCable::Channel
  def subscribed
    stream_from "course:#{params['course_id']}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
