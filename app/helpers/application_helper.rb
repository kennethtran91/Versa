module ApplicationHelper

	def notices
		flash[:notice] ||= []
	end

	def alerts
		flash[:alert] ||= []
	end

  def current_or_guest_user
    if current_user
      if session[:guest_user_id]
        logging_in
        guest_user.destroy
        session[:guest_user_id] = nil
      end
      current_user
    else
      guest_user
    end
  end

  def guest_user
    @cached_guest_user ||= User.find(session[:guest_user_id] ||= create_guest_user.id)

  rescue ActiveRecord::RecordNotFound # if session[:guest_user_id] invalid
    session[:guest_user_id] = nil
    guest_user
  end

  def check_for_guest_or_current
    unless current_user || session[:guest_user_id]
      redirect_to new_user_session_url
    end
  end

  def logging_in
    guest_annotations = guest_user.annotations.all
    guest_annotations.each do |annotation|
      annotation.user_id = current_user.id
      annotation.save!
    end
  end

  def create_guest_user
    u = User.find_by_username("guest")
    unless u
      u = User.create(:username => "guest", :email => "guest_#{Time.now.to_i}#{rand(99)}@guest.com")
      u.save!(:validate => false)
    end
    session[:guest_user_id] = u.id
    u
  end

end
