class UsersController < ApplicationController
	respond_to :json

	def index
		@users = User.includes(:annotations).all
		render :json => @users
	end

	def show
		@user = User.includes(:followings, :follows, :annotations).find_by_id(params[:id])
		render :json => @user.to_json(:include => [:followings, :follows, :annotations])
	end

end
