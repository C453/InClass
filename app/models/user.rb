# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, 
         :registerable,
         :recoverable, 
         :rememberable, 
         :trackable,  
         :validatable, 
         :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_and_belongs_to_many :courses
  has_and_belongs_to_many :attendances
  has_many :questions
end
