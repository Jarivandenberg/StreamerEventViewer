Rails.application.routes.draw do
  root to: "home#index"

  # Make sure that Devise is using a different controller for the Login flow
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  # Add path for api/events
  namespace :api do
    resources :events, only: [:index, :create],  path: '/events'
  end

  # Mount the ActionCable.
  mount ActionCable.server => '/cable'
end
