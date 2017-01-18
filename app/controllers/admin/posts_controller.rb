class Admin::PostsController < AdminController
  before_action :find_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.recent
  end

  def show
  end

  def edit
  end

  def update
    if @post.update(post_params)
      redirect_to admin_posts_path, notice: 'Flag was succesfully updated!'
    else
      render :edit
    end
  end

  private

  def find_post
    @post = Post.find(params[:id])
  end

  def post_params
		params.require(:post).permit(:title, :description, :source, :image, :animated)
	end
end
