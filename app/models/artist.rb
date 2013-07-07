class Artist < ActiveRecord::Base
  attr_accessible :avatar_url, :bio, :name, :user_id

  has_many :songs

  has_many :albums
  
  has_many :tracks,
  	:through => :albums,
  	:source => :tracks

  belongs_to :user

  validates :name, :presence => true

  searchable do
  	text :name
  end

end
