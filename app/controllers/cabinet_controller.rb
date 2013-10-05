class CabinetController < ApplicationController
  before_filter :authenticate_user!

  def edit
    @user = current_user
  end

  def update
    @user = current_user
 
    respond_to do |format|
      if @user.update_attributes(params[:user])
        logger.info "SAVE OK"
        format.html  { redirect_to(cabinet_path,
                      :notice => I18n.t('cabinet.save_success')) }
        format.json  { head :no_content }
      else
        logger.debug @user.errors.messages

        format.html do
          ActionView::Base.field_error_proc = Proc.new do |html_tag, instance|
            if html_tag =~ /\<label/
              html_tag
            else
              errors = Array(instance.error_message).join(',')
              %(#{html_tag}<span class="validation-error">&nbsp;#{errors}</span>).html_safe
            end
          end
          render :action => "edit"
        end
        format.json  { render :json => @user.errors,
                      :status => :unprocessable_entity }
      end
    end
  end
end