class Post < ActiveRecord::Base
	belongs_to :user

	scope :processed, -> {where(image_processing: false)}
	scope :top, -> {processed.order(cached_votes_total: :desc)}
	scope :recent, -> {processed.order(created_at: :desc)}

	validates :description, length: {maximum: 400}, allow_blank: true
	validates :title, presence: true
	validates :image, attachment_presence: true

	acts_as_votable


	has_attached_file :image,
		styles: {
			large: "1000x1000#",
			medium: "550x550#",
			thumb: {geometry: '350x350#', animated: false},
			thumb_animated: {geometry: '350x350#', animated: true}
		}
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
	after_post_process :set_animated
	process_in_background :image

	def set_animated
		img = Magick::ImageList.new(self.image.queued_for_write[:original].path)
		# img = Magick::ImageList.new(self.image.url(:original))
		self.animated = img.scene != 0
	end
end
