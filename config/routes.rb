Rails.application.routes.draw do
  resources :slides
  post 'get_grade', to: 'grades#get_grade'
  resources :attendances
  post 'check_attendance', to: 'check_attendance#check_attendance'
  post 'close_attendance', to: 'close_attendance#close_attendance'
  post 'take_attendance', to: 'take_attendance#take_attendance'
  post 'yeah', to: 'yeah_question#yeah'
  post 'unyeah', to: 'yeah_question#unyeah'
  post 'answer_question', to: 'yeah_question#answer_question'
  resources :questions

  resources :quiz_submissions
  get 'get_quiz_submissions/:course_id/:quiz_id', to: 'quiz_submissions#get_quiz_submissions'

  resources :quiz_questions
  get 'get_active_quiz_questions/:quiz_id', to: 'quiz_questions#get_active_quiz_questions'
  get 'get_recent_quiz_questions/:quiz_id', to: 'quiz_questions#get_recent_quiz_questions'

  resources :quizzes
  get 'get_active_quiz/:course_id', to: 'quizzes#get_active_quiz'
  get 'get_recent_quiz/:course_id', to: 'quizzes#get_recent_quiz'
  post 'close_quiz', to: 'quizzes#close_quiz'

  resources :documents
  post 'get_courses', to: 'get_courses#get_courses'
  post 'get_owned_courses', to: 'get_courses#get_owned_courses'
  resources :slides
  post 'move_page', to: 'slides#move_page'
  resources :courses
  post 'register_course', to: 'add_user_to_course#register_course'
  post 'drop_course', to: 'add_user_to_course#drop_course'
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
