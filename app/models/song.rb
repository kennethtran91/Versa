class Song < ActiveRecord::Base
  attr_accessible :artist_id, :lyrics, :soundcloud_url, 
  :spotify_uri, :title, :youtube_url, :year

  belongs_to :artist

  has_many :album_tracks,
  :foreign_key => :track_id

  has_many :albums,
  :through => :album_tracks,
  :source => :album

  has_many :annotations

  validates :title, :lyrics, :presence => true

end
