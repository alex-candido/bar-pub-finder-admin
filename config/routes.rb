Rails.application.routes.draw do
  devise_for :admin, class_name: "User", singular: :admin

  namespace :admin do
    resources :map, only: [ :index ]
    resources :dashboard, only: [ :index ]
    resources :users
    resources :places
  end

  namespace :api do
    namespace :v1 do
      resources :places, only: [ :index ] do
        collection do
          get :search
        end
      end
    end
  end

  # Defines the root path route ("/")
  root "admin/dashboard#index"
end
