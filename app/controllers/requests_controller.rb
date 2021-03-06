class RequestsController < ApplicationController
  before_filter :authenticate_user!
  before_filter :test_user_edit_ability,
                only: [:assign_workers, :create, :update, :destroy, :complete]

  def index
    @active_tab = "currents"
    collect_workers
    @requests = Request.actual.includes(:workers).includes(:client)
    @clients = Client.all
  end

  def history
    @active_tab = "history"
    collect_workers
    @requests = Request.where(closed: true)

    if (params[:filter])
      if (params[:filter][:date_from].present?)
        if Rails.env.production? # PostgreSQL
          @requests = @requests.where("requests.day >= DATE ?", params[:filter][:date_from])
        else # Sqlite
          @requests = @requests.where("requests.day >= date(?)", params[:filter][:date_from])
        end
      end
      if (params[:filter][:date_to].present?)
        if Rails.env.production? # PostgreSQL
          @requests = @requests.where("requests.day <= DATE ?", params[:filter][:date_to])
        else # Sqlite
          @requests = @requests.where("requests.day <= date(?)", params[:filter][:date_to])
        end
      end
      if (params[:filter][:address].present?)
        if Rails.env.production? # PostgreSQL
          @requests = @requests.where("requests.address ILIKE ?", "%#{params[:filter][:address]}%")
        else # Sqlite
          @requests = @requests.where("requests.address LIKE ?", "%#{params[:filter][:address]}%")
        end        
      end
      if (params[:filter][:client].present?)
        @requests = @requests.where(client_id: params[:filter][:client])
      end
    end
    if (params[:filter] && params[:filter][:worker_ids].present?)
      @requests = @requests.includes(:workers).where(workers: { id: params[:filter][:worker_ids] })
    else
      @requests = @requests.includes(:workers).includes(:client)
    end
    @requests = @requests.limit(20)
  end

  def print
    if params[:rsts]
      ids_array = params[:rsts].split(",")
      @requests = Request.where(id: ids_array).includes(:workers)
    else
      @requests = Request.actual.includes(:workers)
    end

    render layout: false
  end

  def assign_workers
    notice_text = I18n.t('requests.workers_assigned')
    if params[:rsts].present?
      ids_array = params[:rsts].split(",")
      wrks_ids = []
      wrks_ids = params[:wrks].split(",") if params[:wrks]
      Request.find(ids_array).each do |rq|
        rq.set_workers_with_remfun(wrks_ids)
      end
    else
      notice_text = I18n.t('requests.no_requests_choosed')
    end

    respond_to do |format|
      format.html  { redirect_to(root_url,
                    :notice => notice_text) }
      format.json  { head :no_content }
    end
  end

  def show
    respond_to do |format|
      format.html  { render text: "Use JSON, man" }
      format.json do
        rq = Request.find(params[:id])
        render :json => rq
      end
    end
  end

  def create
    @request = Request.new(params[:request])
    @request.user = current_user
   
    respond_to do |format|
      if @request.save
        format.html  { redirect_to(root_url,
                      :notice => I18n.t('requests.request_created')) }
        format.json  { render :json => { id: @request.id },
                      :status => :created }
      else
        format.html  { redirect_to(root_url,
                      :alert => I18n.t('requests.request_creation_failed')) }
        format.json  { render :json => @request.errors,
                      :status => :unprocessable_entity }
      end
    end
  end

  def update
    @request = Request.find(params[:id])
   
    respond_to do |format|
      if @request.update_attributes(params[:request])
        format.html  { redirect_to(root_url,
                      :notice => I18n.t('requests.request_updated')) }
        format.json  { head :no_content }
      else
        format.html  { redirect_to(root_url,
                      :alert => I18n.t('requests.request_updation_failed')) }
        format.json  { render :json => @request.errors,
                      :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @request = Request.find(params[:id])
    @request.destroy
   
    respond_to do |format|
      format.html { redirect_to root_url }
      format.json { head :no_content }
    end
  end

  def complete
    @request = Request.find(params[:id])
    reason = params[:request][:close_reason] if params[:request]
    @request.close_reason = reason if reason.present?
    @request.closed = true

    respond_to do |format|
      if @request.save
        format.html  { redirect_to(root_url,
                      :notice => I18n.t('requests.request_completed')) }
        format.json { head :no_content }
      else
        format.html  { redirect_to(root_url,
                      :alert => I18n.t('requests.request_completion_failed')) }
        format.json  { render :json => @request.errors,
                      :status => :unprocessable_entity }
      end
    end
  end

  private

  def test_user_edit_ability
    raise ActionController::InvalidAuthenticityToken if current_user.observer?
  end

  def collect_workers
    @workers = Worker.all
  end
end