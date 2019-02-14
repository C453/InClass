class CloseQuizChannel < ApplicationCable::Channel
    def subscribed
       stream_from "close_quiz_channel"
    end
  
    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  end
  