module SongHelper
	def check_artist(name)
		artist_name = name.titleize
		artist = Artist.find_by_name(artist_name)
		artist = Artist.create!(:name => artist_name) unless artist

		artist
	end

	def check_album(title, artist)
		album_title = title.titleize
		album = Album.where(:title => album_title, :artist_id => artist.id).first
		unless album
			album = Album.new(:title => album_title, :artist_id => artist.id)
		end

		album
	end

end