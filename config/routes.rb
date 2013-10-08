Awp::Application.routes.draw do

  devise_for :users,
             path: '',
             path_names: { sign_in: 'login', sign_out: 'logout' },
             controllers: { sessions: "users/sessions" }



  get "cabinet" => "cabinet#edit", as: "cabinet"
  put "cabinet" => "cabinet#update"

  resources :requests, except: [ :index, :new, :edit ]

  get "print" => "requests#print", as: "requests_print"
  get "history" => "requests#history", as: "requests_history"

  root :to => 'requests#index'

end