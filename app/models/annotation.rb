class Annotation < ActiveRecord::Base
  attr_accessible :annotator_id, :body, :end_char, :song_id, :start_char, :image_url

  validates :song_id, :annotator_id, :presence => true
  validate :start_end_chars_fall_within_lyrics

  has_many :likes

  belongs_to :song
  
  belongs_to :annotator,
  	:class_name => "User",
  	:foreign_key => :annotator_id,
  	:inverse_of => :annotations

  has_attached_file :photo, :styles => {
  	:big => "300x300>",
  	:small => "100x100#"
  }

  def as_json(options = {})
    json = super(options)
    json[:rating] = self.rating
    json[:annotator] = self.annotator
    json
  end

	def rating
	 	likes.where(dislike: false).count - likes.where(dislike: true).count
	end

 private

 def start_end_chars_fall_within_lyrics
 	song = Song.find(self.song_id)
 	if (start_char || end_char) > song.lyrics.length
 		errors[:start_end_chars] << "Annotation's reference is not within the song's lyrics."
 	end
 end

end
