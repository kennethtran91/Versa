class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :username, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

  validates_presence_of :username

  has_many :annotations,
  	:class_name => "Annotation",
  	:inverse_of => :annotator,
  	:foreign_key => :annotator_id

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


end
