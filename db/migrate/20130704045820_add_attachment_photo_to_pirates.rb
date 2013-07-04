class AddAttachmentPhotoToPirates < ActiveRecord::Migration
  def self.up
    change_table :annotations do |t|
      t.attachment :photo
    end
  end

  def self.down
    drop_attached_file :annotations, :photo
  end
end
