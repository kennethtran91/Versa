class Song < ActiveRecord::Base

  before_save :resolve_sc_url

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

  searchable do
    text :title, :as => :title_textp
    text :artist, :as => :artist_textp do
      artist.name
    end
  end

  def self.soundcloud
    Soundcloud.new({
      :client_id => ENV['SC_CLIENT_ID'],
      :client_secret => ENV['SC_CLIENT_SECRET']
      })
  end

  private

  def resolve_sc_url
    url = self.soundcloud_url
    http_exp = Regexp.new("^(http|https)://")
    full_url = http_exp.match(url)
    if self.soundcloud_url && full_url
      url = self.soundcloud_url
      track = Song.soundcloud.get('/resolve', :url => url)
      self.soundcloud_url = "/tracks/#{track.id}"
    end
  end

end
