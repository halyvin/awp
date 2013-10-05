class RequestsController < ApplicationController
  before_filter :authenticate_user!, :collect_workers

  def index
    @active_tab = "currents"
    @requests = Request.actual.includes(:workers)
  end

  def history
    @active_tab = "history"
  end

  def print
    @requests = Request.actual.includes(:workers)
    render layout: false
  end

  private

  def collect_workers
    @workers = Worker.all
  end
end