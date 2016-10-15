class UsersController < ApplicationController
  def show
    @user = User.where('lower(username) = ?', params[:id].downcase).first
    if @user.blank?
      redirect_to root_path, alert: "Sorry we could not find that user."
    end
  end
end
