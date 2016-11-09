class UsersController < ApplicationController
  def show
    @user = User.where('lower(username) = ?', params[:id].downcase).first
    @posts = @user.posts.paginate({page: params[:page], per_page: 24})
    if @user.blank?
      redirect_to root_path, alert: "Sorry we could not find that user."
    end
    if request.xhr?
			render json: {content: render_to_string(partial:'posts/posts.html.haml', layout: false, locals: {posts: @posts, labels: false})}
		end
  end
end
