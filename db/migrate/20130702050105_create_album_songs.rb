class CreateAlbumSongs < ActiveRecord::Migration
  def change
    create_table :album_songs do |t|
      t.integer :album_id
      t.integer :song_id

      t.timestamps
    end
  end
end
