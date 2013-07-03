class AddAlbumTrackNumberToAlbumTrackTable < ActiveRecord::Migration
  def change
  	add_column :album_tracks, :track_number, :integer
  end
end
