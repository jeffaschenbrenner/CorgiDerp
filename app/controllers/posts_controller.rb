class PostsController < ApplicationController
	before_action :find_post, only: [:show, :edit, :update, :destroy]
	before_action :authenticate_user!, except: [:index, :show]
	before_filter :require_permission, only: [:edit, :update, :destroy]

	def index
		@posts = Post.all.order('created_at DESC')
	end

	def show
	end

	def new
		@post = current_user.posts.build
	end

	def create
		@post = current_user.posts.build(post_params)
		if @post.save
			redirect_to @post, notice: 'Successfully created new Post!'
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
			render 'edit'
		end
	end

	def destroy
	end

	private

	def find_post
		@post = Post.find(params[:id])
	end

	def post_params
		params.require(:post).permit(:title, :description, :source, :image)
	end

	def require_permission
		if current_user != @post.user
			redirect_to post_path(@post), alert: "You are not authorized to perform this operation."
		end
	end
end
