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
      redirect_to admin_post_path(@post), flash: {success: 'Post was updated!'}
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

  private

  def find_post
    @post = Post.find(params[:id])
  end

  def post_params
		params.require(:post).permit(:title, :description, :source, :image, :animated)
	end
end
