class CabinetController < ApplicationController
  before_filter :authenticate_user!

  def edit
    @user = current_user
  end

  def update
    @user = current_user
 
    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html  { redirect_to(cabinet_path,
                      :notice => I18n.t('cabinet/save_success')) }
        format.json  { head :no_content }
      else
        format.html  { render :action => "edit" }
        format.json  { render :json => @user.errors,
                      :status => :unprocessable_entity }
      end
    end
  end
end