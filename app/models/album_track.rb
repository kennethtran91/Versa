class AlbumTrack < ActiveRecord::Base
  attr_accessible :album_id, :track_id, :track_number

  belongs_to :album
  belongs_to :track,
  	:class_name => "Song",
  	:foreign_key => :track_id
end
