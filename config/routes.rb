Rails.application.routes.draw do
  post 'get_courses', to: 'get_courses#get_courses'
  resources :courses
  post 'register_course', to: 'add_user_to_course#register_course'
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
