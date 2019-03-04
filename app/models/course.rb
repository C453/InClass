class Course < ApplicationRecord
    has_and_belongs_to_many :users
    has_many :documents
    has_many :slides
    has_many :quizzes
    has_many :questions

    def is_admin? user_id
        admins.include? user_id.to_s
    end
    
end
