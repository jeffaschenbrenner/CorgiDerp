class Admin::CommentsController < AdminController
  before_action :find_comment, only: [:edit, :update, :destroy]

  def index
    @comments = Comment.all.order('created_at DESC')
  end

  def edit
  end

  def update
    if @comment.update(comment_params)
      redirect_to admin_comments_path, flash: {success: 'Comment was updated!'}
    else
      render :edit
    end
  end

  def destroy
		respond_to do |format|
			if @comment.destroy
				format.json {render json: {success: true}}
			else
				format.json {render json: {success: false, errors: @comment.errors}}
			end
		end
	end

  private

  def find_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
		params.require(:comment).permit(:content)
	end

end
