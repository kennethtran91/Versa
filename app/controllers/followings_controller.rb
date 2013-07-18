class FollowingsController < ApplicationController

	def create
		@following = Following.new(:followed_id => params[:id])
		@following.follower = current_or_guest_user
		@following.save
		render :json => @following
	end

	def destroy
		@following = Following.where(:followed_id => params[:id], :follower_id => current_or_guest_user.id).first
		@following.destroy
		render :json => @following
	end

end
