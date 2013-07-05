class SongsController < ApplicationController
include SongHelper
	respond_to :json

	def index
		@songs = Song.includes(:artist).all
		render :json => @songs.to_json(:include => [:artist])
	end

	def show
		@song = Song.find_by_id(params[:id])
		render :json => @song.to_json(:include => [:artist, :albums, :annotations])
	end

	def new
		@song = Song.new
		render :new
	end

	def create
		@artist = check_artist(params[:artist][:name])
		
		if params[:album][:title]
			@album = check_album(params[:album][:title], @artist)
		end
		
		@song = @artist.songs.new(params[:song])
		@album.tracks << @song

		if @song.save
			@album.save
			notices << "Song created successfully."
			redirect_to song_url(@song)
		else
			alerts << @song.errors.full_messages
			render :new
		end

	end

	def edit
		@song = Song.find_by_id(params[:id])
		render :edit
	end

	def update
		@song = Song.find_by_id(params[:id])
		if @song.update_attributes(params[:song])
			notices << "Song edited successfully."
			redirect_to song_url(@song)
		else
			alerts << "Failed to edit song."
			alerts << @song.errors.full_messages
			render :edit
		end
	end

	def destroy
		@song = Song.find_by_id(params[:id])
		if @song 
			@song.destroy
			notices << "Song deleted."
			redirect_to songs_url
		end
	end

end
