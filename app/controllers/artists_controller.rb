class ArtistsController < ApplicationController
	respond_to :json

	def index
		@artists = Artist.all
		render :json => @artists
	end

	def show
		@artist = Artist.find_by_id(params[:id])
		respond_to :json
	end

	def update
		@artist = Artist.find_by_id(params[:id])
		if @artist.update_attributes(params[:artist])
			render :json => @artist
		else
			render :json => @artists.errors.full_messages
		end
	end
	
end