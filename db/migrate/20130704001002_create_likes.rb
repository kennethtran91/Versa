class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :annotation_id
      t.integer :user_id
      t.boolean :dislike

      t.timestamps
    end
  end
end
