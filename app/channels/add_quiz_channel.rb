class AddQuizChannel < ApplicationCable::Channel
    def subscribed
       stream_from "add_quiz_channel"
    end
  
    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  end
  