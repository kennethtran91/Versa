Versa::Application.routes.draw do
  root :to => "root#root"
  devise_for :users

  resources :albums, :only => [:show]
	resources :artists, :only => [:show]
  resources :annotations, :only => [:show, :edit, :update, :destroy]
  resources :songs do
  	member do
  		resources :annotations, :only => [:new, :create]
  	end
  end

end
