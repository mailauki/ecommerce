Rails.application.routes.draw do
  resources :carts
  resources :images
  resources :product_categories
  resources :categories
  resources :products
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/hello', to: 'application#hello_world'

  post '/signup', to: 'users#create'
  get '/me', to: 'users#me'

  post '/login', to: 'session#create'
  delete '/logout', to: 'session#destroy'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
