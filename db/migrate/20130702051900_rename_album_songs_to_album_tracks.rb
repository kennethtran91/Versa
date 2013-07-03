class RenameAlbumSongsToAlbumTracks < ActiveRecord::Migration
  def change
  	rename_table :album_songs, :album_tracks
  end
end
