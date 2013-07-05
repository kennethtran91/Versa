class ArtistsController < ApplicationController
	respond_to :json

	def show
		@artist = Artist.find_by_id(params[:id])
	end
	
end