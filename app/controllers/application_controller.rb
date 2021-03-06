class ApplicationController < ActionController::Base
  rescue_from ActionController::RoutingError,      with: :not_found
  rescue_from AbstractController::ActionNotFound,  with: :not_found
  rescue_from ActiveRecord::RecordNotFound,        with: :not_found

  protect_from_forgery

  protected

  def not_found
    respond_to do |format|
      format.html { render :file => File.join(Rails.root, 'public', '404.html'), layout: false, status: 404 }
      format.json { render :text => '{"error": "not_found"}', status: 404 }
    end
  end
end
