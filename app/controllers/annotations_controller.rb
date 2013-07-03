class AnnotationsController < ApplicationController
	
	def show
		@annotation = Annotation.find(params[:id])
		@song = @annotation.song
		render :show
	end

	def new
		@song = Song.find(params[:id])
		@annotation = @song.annotations.new
		render :new
	end

	def create
		@song = Song.find(params[:id])
		@annotation = @song.annotations.new(params[:annotation])
		@annotation.annotator = current_user

		if @annotation.save
			notices << "Successfully created annotation."
			redirect_to annotation_url(@annotation)
		else
			alerts << "Failed to create annotation."
			alerts << @annotation.errors.full_messages
			render :new
		end
	end

	def edit
	end

	def update
	end

	def destroy
	end

end
