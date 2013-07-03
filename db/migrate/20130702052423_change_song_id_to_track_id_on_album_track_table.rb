class ChangeSongIdToTrackIdOnAlbumTrackTable < ActiveRecord::Migration
  def change
  	rename_column :album_tracks, :song_id, :track_id
  end
end
