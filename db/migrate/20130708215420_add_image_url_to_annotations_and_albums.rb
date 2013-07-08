class AddImageUrlToAnnotationsAndAlbums < ActiveRecord::Migration
  def change
  	add_column :annotations, :image_url, :string
  	add_column :albums, :image_url, :string
  end
end
