class RootController < ApplicationController
before_filter :authenticate_user!

def root
	@songs = Song.all
	render :root
end

end
