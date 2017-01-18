Rails.application.routes.draw do

  devise_for :users
  resources :posts do
    member do
      put 'like', to: 'posts#like'
    end
    resources :comments
  end
  resources :users, only: [:show]
  resources :flags, only: [:create]

  namespace :admin do
    resources :posts
    resources :comments
    resources :flags
    resources :flag_types
    resources :users
  end

  get '/admin', to: 'admin#dashboard'

  root 'posts#index'

end
