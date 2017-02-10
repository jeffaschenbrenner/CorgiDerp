class AdminController < ApplicationController
  layout 'admin'
  before_filter :authenticate_user!
  before_filter :require_admin

  def dashboard
    @recent_posts = Post.limit(5).order('created_at DESC')
    @recent_comments = Comment.limit(5).order('created_at DESC')
    @recent_flags = Flag.limit(5).order('created_at DESC')
    @recent_users = User.limit(5).order('created_at DESC')
  end

  private

  def require_admin
    redirect_to root_path unless current_user.admin?
  end
end
