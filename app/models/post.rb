class Post < ActiveRecord::Base
	belongs_to :user

	has_attached_file :image, styles: { large: "1000x1000#", medium: "550x550#" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
