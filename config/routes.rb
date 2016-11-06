Rails.application.routes.draw do

  devise_for :users
  resources :posts do
    member do
      put 'like', to: 'posts#like'
    end
    resources :comments
  end
  resources :users, only: [:show]

  root 'posts#index'

end
