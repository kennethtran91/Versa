Versa::Application.routes.draw do
  root :to => "root#root"
  devise_for :users

  resources :albums, :only => [:show]
	resources :artists, :only => [:show] do
    collection do
      get 'search'
    end
  end
  resources :annotations do
    member do
      post 'like'
      post 'dislike'
    end
  end
  resources :songs do
    collection do
      get 'search'
    end
  	member do
  		resources :annotations, :only => [:new, :create]
  	end
  end
  resources :users, :only=> [:index, :show]

end
