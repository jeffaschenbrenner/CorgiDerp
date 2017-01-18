class Admin::CommentsController < AdminController
  def index
    @comments = Comment.all.order('created_at DESC')
  end
end
