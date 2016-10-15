class PostsController < ApplicationController
	before_action :find_post, only: [:show, :edit, :update, :destroy, :like]
	before_action :authenticate_user!, except: [:index, :show]
	before_filter :require_permission, only: [:edit, :update, :destroy]

	def index
		case params[:sort]
		when 'top'
			@posts = Post.top
		else
			params[:sort] = 'recent'
			@posts = Post.recent
		end
	end

	def show
		user = @post.user
		@user_posts = user.posts.where.not(id: @post).order('RANDOM()').limit(4)
	end

	def new
		@post = current_user.posts.build
	end

	def create
		@post = current_user.posts.build(post_params)
		if @post.save
			# img = Magick::ImageList.new(@post.image.url(:original))
			# @post.update_column('animated', img.scene != 0)
			redirect_to root_path, success: 'Your post was accepted! It may take a few minutes to be displayed.'
		else
			render 'new'
		end
	end

	def edit
	end

	def update
		if @post.update(post_params)
			redirect_to @post, notice: 'Post was succesfully updated!'
		else
			render :edit
		end
	end

	def destroy
		respond_to do |format|
			if @post.destroy
				format.json {render json: {success: true}}
			else
				format.json {render json: {success: false, errors: @post.errors}}
			end
		end
	end

	def like
		if current_user.liked? @post
			@post.unliked_by current_user
		else
			@post.liked_by current_user
		end
		redirect_to :back
	end

	private

	def find_post
		@post = Post.find(params[:id])
	end

	def post_params
		params.require(:post).permit(:title, :description, :source, :image, :animated)
	end

	def require_permission
		if current_user != @post.user
			redirect_to post_path(@post), alert: "You are not authorized to perform this operation."
		end
	end
end
