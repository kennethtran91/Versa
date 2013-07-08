class ArtistsController < ApplicationController
	respond_to :json

	def index
		@artists = Artist.all
		respond_to :json
	end

	def show
		@artist = Artist.find_by_id(params[:id])
		respond_to :json
	end
	
end