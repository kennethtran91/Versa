class UsersController < ApplicationController
	respond_to :json

	def index
		@users = User.all
		render :json => @users
	end

	def show
		@user = User.find_by_id(params[:id])
		render :json => @user
	end

end