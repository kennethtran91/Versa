class Like < ActiveRecord::Base
  attr_accessible :annotation_id, :dislike, :user_id

  validates :dislike, :inclusion => {:in => [true, false]}
  validates :user, :annotation, :presence => true
  validate :user_cant_vote_twice

  belongs_to :annotation
  belongs_to :user

  private
  def user_cant_vote_twice
  	like_exists = Like.where(:user_id => self.user_id, 
  													 :annotation_id => self.annotation_id).first
  	if like_exists
  		errors[:double_vote] << "User can't vote twice."
  	end
  end
end
