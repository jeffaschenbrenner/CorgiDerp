class Post < ActiveRecord::Base
	belongs_to :user
	has_many :comments, dependent: :destroy
	has_many :flags, dependent: :destroy

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
		},
		storage: :s3,
		bucket: ENV['S3_BUCKET_NAME'],
		s3_credentials: {
			access_key_id: ENV['AWS_ACCESS_KEY_ID'],
			secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
		}

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/, message: 'We do not currently support that file type.'
	after_post_process :set_animated
	process_in_background :image

	def self.filter_posts(params, current_user)
		params[:sort] ||= 'recent'
		return Post.send(params[:sort]).where.not(id: Flag.active.select(:post_id)) unless current_user && current_user.admin
		return Post.send(params[:sort])
	end

	def set_animated
		img = Magick::ImageList.new(self.image.queued_for_write[:original].path)
		self.animated = img.scene != 0
	end

end
