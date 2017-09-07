Skirball::Application.routes.draw do
  ActiveAdmin.routes(self)

  devise_for :admin_users, ActiveAdmin::Devise.config
  post '/admin/upload' => 'admin/uploads#create', :as => :admin_upload
  get "/podcasts/feed.mp3", to: redirect('/podcasts/feed.rss')
  get '/podcasts/feed' => 'podcasts#feed', :as => :podcast_feed
  get "/podcastsNew.xml", to: redirect('/podcasts/feed.rss')
  [:semesters, :news_items, :courses, :videos, :podcasts].each do |resource|
    resources resource, :only => [:index, :show]
  end
  post '/courses' => "courses#index"

  resources :events, :only => [:index, :show]
  resources :teachers, :only => [:index, :show]
  resource :account, :except => :index do
    resources :purchases, :only => [:index, :show, :edit, :update], controller: 'account/purchases'
    resources :courses, :only => [:index, :show], controller: 'account/courses'
    resources :donations, :only => [:index, :show], controller: 'account/donations'
  end
  resources :purchases, :only => [:create, :show]

  get '/faculty' => "teachers#index", :as => :faculty

  get "/login" => "sessions#new", :as => :login
  post "/login" => "sessions#create"
  get "/logout" => "sessions#destroy", :as => :logout
  
  get "/line_items/:course_id" => "line_items#create", :as => :create_line_item
  post "/line_items/fee_type/:id/:fee_type" => "line_items#change_fee_type", :as => :change_line_item_fee
  post "/line_items/:id/quantity" => "line_items#update_quantity", :as => :update_line_item_quantity
  delete "/line_items/:id" => "line_items#destroy", :as => :line_items

  post "/event_items/:event_id" => "event_items#create", :as => :create_event_item
  get "/event_items/:event_id" => "event_items#create", :as => :create_event_item
  post "/event_items/:id/quantity" => "event_items#update_quantity", :as => :update_event_item_quantity
  delete "/event_items/:id" => "event_items#destroy", :as => :event_items

  get '/donate' => "donations#new", :as => :donate
  get '/donate/new/:amount' => "donations#create", :as => :create_donation
  get '/donate/new/' => "donations#create", :as => :donation_from_form
  delete "/donation" => "donations#destroy", :as => :donation

  get "/news" => "news_items#index", :as => :news

  get "/cart" => "carts#show", :as => :cart
  post "/cart" => "carts#discount"

  match "mailing_list_signup" => 'mailing_list_signup#signup'
  
  %w(home calendar).each do |page|
    get "/#{page}" => "pages##{page}", as: page.to_sym
  end
  get "/catalog" => 'courses#catalog', :as => :catalog
  get "/writers_bm.htm", to: redirect('/writer-s-beit-midrash-2013')

  get "/request-a-guide" => 'request_guide#new', :as => :request_guide
  post "/request-a-guide" => 'request_guide#create'

  get "/contact-us" => 'contact#new', :as => :contact
  post "/contact-us" => 'contact#create'

  match "/search" => 'search#index'
  get "/:id" => 'pages#show', :as => :page
  
  root :to => 'pages#home'
  
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
