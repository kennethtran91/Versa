class RootController < ApplicationController
before_filter :check_for_guest_or_current, :except => :guest

  def root
  	@songs = Song.all
  	render :root
  end

  def guest
    create_guest_user
    redirect_to root_url
  end

  def log_out
    if session[:guest_user_id]
      session[:guest_user_id] = nil
      redirect_to new_user_session_url
      return
    end  
    redirect_to destroy_user_session_url
  end

end
