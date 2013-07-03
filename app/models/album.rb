class Album < ActiveRecord::Base
  attr_accessible :artist_id, :title, :year

  belongs_to :artist

  has_many :album_tracks
  has_many :tracks,
  	:through => :album_tracks,
  	:source => :track

  validates :artist, :presence => true

end
