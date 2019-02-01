class CoursesChannel < ApplicationCable::Channel
  def subscribed
     stream_for 'courses'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
