Awp::Application.routes.draw do

  devise_for :users,
             path: '',
             path_names: { sign_in: 'login', sign_out: 'logout' },
             controllers: { sessions: "users/sessions" }



  get "cabinet" => "cabinet#edit", as: "cabinet"
  put "cabinet" => "cabinet#update"

  resources :requests, except: [ :index, :new, :edit ] do
    collection do
      get "assign-workers" => "requests#assign_workers"
    end
    member do
      put "complete"
    end
  end

  get "print" => "requests#print", as: "requests_print"
  match "history" => "requests#history", as: "requests_history"

  root :to => 'requests#index'

end