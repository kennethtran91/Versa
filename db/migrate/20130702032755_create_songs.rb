class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.integer :artist_id
      t.string :title
      t.string :soundcloud_url
      t.string :spotify_uri
      t.string :youtube_url
      t.integer :album_id
      t.text :lyrics

      t.timestamps
    end
  end
end
