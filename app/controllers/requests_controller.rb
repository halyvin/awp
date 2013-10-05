class RequestsController < ApplicationController
  before_filter :authenticate_user!, :collect_workers

  def index
    @active_tab = "currents"
  end

  def history
    @active_tab = "history"
  end

  def print
  end

  private

  def collect_workers
    @workers = Worker.all
  end
end