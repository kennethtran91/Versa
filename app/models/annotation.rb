class Annotation < ActiveRecord::Base
  attr_accessible :annotator_id, :body, :end_char, :song_id, :start_char

  validates :song_id, :annotator_id, :presence => true
  validate :start_end_chars_fall_within_lyrics

  belongs_to :song
  
  belongs_to :annotator,
  	:class_name => "User",
  	:foreign_key => :annotator_id,
  	:inverse_of => :annotations

 private

 def start_end_chars_fall_within_lyrics
 	song = Song.find(self.song_id)
 	if (start_char || end_char) > song.lyrics.length
 		errors[:start_end_chars] << "Annotation's reference is not within the song's lyrics."
 	end
 end

end
