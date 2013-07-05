class AlbumsController < ApplicationController
	def show
		@album = Album.find(params[:id])
		render :json => @album.to_json(:include => [:artist, :album_tracks])
	end

end
