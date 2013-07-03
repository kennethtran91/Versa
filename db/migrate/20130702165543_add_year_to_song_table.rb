class AddYearToSongTable < ActiveRecord::Migration
  def change
  	add_column :songs, :year, :integer
  end
end
