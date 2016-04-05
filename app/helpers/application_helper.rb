module ApplicationHelper

	def animated?(img)
		image = Magick::ImageList.new(img)
		return image.scene != 0
	end
end
