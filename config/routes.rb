Rails.application.routes.draw do
  resources :documents
  post 'get_courses', to: 'get_courses#get_courses'
  post 'get_owned_courses', to: 'get_courses#get_owned_courses'
  resources :courses
  post 'register_course', to: 'add_user_to_course#register_course'
  post 'drop_course', to: 'add_user_to_course#drop_course'
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
