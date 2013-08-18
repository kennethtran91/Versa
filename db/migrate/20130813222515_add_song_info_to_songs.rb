class AddSongInfoToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :song_info, :string
  end
end
