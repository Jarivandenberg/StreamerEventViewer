Rails.application.routes.draw do
  root to: "home#index"
  # Make sure that Devise is using a different controller for the Login flow
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
end
