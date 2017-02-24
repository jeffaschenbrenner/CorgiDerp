class Admin::UsersController < AdminController
  before_action :find_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.all
  end

  def show
  end

  def edit
  end

  def update
    if @user.update(user_params)
      redirect_to admin_users_path, flash: {success: 'User was updated!'}
    else
      render :edit
    end
  end

  def destroy
		respond_to do |format|
			if @user.destroy
				format.json {render json: {success: true}}
			else
				format.json {render json: {success: false, errors: @user.errors}}
			end
		end
	end

  private

  def find_user
    @user = User.where('lower(username) = ?', params[:id].downcase).first
  end

  def user_params
		params.require(:user).permit(:email, :username, :admin)
	end

end
