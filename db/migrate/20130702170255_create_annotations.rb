class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :song_id
      t.integer :annotator_id
      t.integer :start_char
      t.integer :end_char
      t.text :body

      t.timestamps
    end
  end
end
