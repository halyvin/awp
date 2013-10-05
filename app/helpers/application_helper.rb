module ApplicationHelper

  def after_sign_in_path_for
    root_path
  end

  def after_sign_out_path_for
    new_user_session_path
  end
end
