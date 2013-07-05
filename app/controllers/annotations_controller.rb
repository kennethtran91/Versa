class AnnotationsController < ApplicationController
	
	def show
		@annotation = Annotation.find(params[:id])
		@song = @annotation.song
		render :json => @annotation
	end

	def new
		@song = Song.find(params[:id])
		@annotation = @song.annotations.new
		render :new
	end

	def create
		@annotation = current_user.annotations.new(params[:annotation])

		if @annotation.save
			notices << "Successfully created annotation."
			render :json => @annotation
		else
			alerts << "Failed to create annotation."
			alerts << @annotation.errors.full_messages
			render :json => @annotation
		end
	end

	def like
		annotation = Annotation.find_by_id(params[:id])
		@like = annotation.likes.new(:user_id => current_user.id)
		@like.dislike = false
		@like.save!
		render :json => @annotation
	end

	def dislike
		annotation = Annotation.find_by_id(params[:id])
		@like = annotation.likes.new(:user_id => current_user.id)
		@like.dislike = true
		@like.save!
		render :json => @annotation
	end

	def edit
	end

	def update
	end

	def destroy
	end

end
