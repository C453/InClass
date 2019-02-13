class QuizQuestion < ApplicationRecord
    belongs_to :quizzes, optional: true
end
