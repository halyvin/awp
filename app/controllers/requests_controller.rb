class RequestsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @active_tab = "currents"
    collect_workers
    @requests = Request.actual.includes(:workers)
    @clients = Client.all
  end

  def history
    @active_tab = "history"
    collect_workers
  end

  def print
    @requests = Request.actual.includes(:workers)
    render layout: false
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

  private

  def collect_workers
    @workers = Worker.all
  end
end