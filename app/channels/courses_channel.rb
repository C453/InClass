class CoursesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "courses:#{params['user_id']}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
