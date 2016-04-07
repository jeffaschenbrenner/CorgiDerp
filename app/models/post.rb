class Post < ActiveRecord::Base
	belongs_to :user

	has_attached_file :image, styles: { large: "1000x1000#", medium: "550x550#", thumb: {geometry: '350x350#', animated: false}, thumb_animated: {geometry: '350x350#', animated: true}}
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
