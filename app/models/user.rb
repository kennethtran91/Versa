class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  attr_accessible :name, :email, :username, :password, 
    :password_confirmation, :remember_me, :provider, :uid, 
    :avatar_url, :oauth_token

  validates_presence_of :username

  has_many :annotations,
  	:class_name => "Annotation",
  	:inverse_of => :annotator,
  	:foreign_key => :annotator_id

  has_many :votes,
    :through => :annotations,
    :source => :likes

  has_many :likes

  has_many :followings,
    :class_name => "Following",
    :foreign_key => :followed_id

  has_many :followers,
    :through => :followings,
    :source => :follower

  has_many :follows,
    :class_name => "Following",
    :foreign_key => :follower_id

  has_many :followed_users,
    :through => :follows,
    :source => :followed

  def as_json(options = {})
    json = super(options)
    json[:iq] = self.iq
    json
  end

  def iq
    (votes.like_count * 100) - (votes.dislike_count * 10)
  end

  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create(
        provider: auth.provider,
        uid: auth.uid,
        username: auth.info.name,
        email: auth.info.email,
        password: Devise.friendly_token[0, 20],
        oauth_token: auth.credentials.token,      
        )
      user.set_photo
    end
    user
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

  def facebook
    @facebook ||= Koala::Facebook::API.new(oauth_token)
  end

  def set_photo
    albums = self.facebook.get_connections("me", "albums")
    album_id = nil
    albums.each do |album| 
      album_id = album["id"] if album["name"] == "Profile Pictures"
    end
    photos = self.facebook.get_connections(album_id, "photos")
    self.avatar_url = photos[0]["images"][5]["source"]
    self.save!
  end

  def to_preact
    {
      :name => self.name,
      :email => self.email,
      :uid => self.id,
      :properties => {
        :created_at => self.created_at.to_i
      }
    }
  end


end
