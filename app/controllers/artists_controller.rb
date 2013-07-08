class ArtistsController < ApplicationController
	respond_to :json

	def show
		@artist = Artist.find_by_id(params[:id])
		respond_to :json
	end
	
end