object @artist
attributes :id, :avatar_url, :bio, :name, :user_id

child :songs do
	attributes :id, :title
end

child :albums do
	attributes :id, :title, :year
end