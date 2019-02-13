class Quiz < ApplicationRecord
    belongs_to :courses, optional: true
    has_many :quiz_questions
end
