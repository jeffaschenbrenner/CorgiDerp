class FlagsController < ApplicationController
  before_action :authenticate_user!

  def create
    @flag = Flag.new
    @flag.user_id = current_user.id
    @flag.post_id = params[:post_id]
    @flag.flag_type_id = params[:flag_type_id]
    @flag.comment = params[:comment]
    if @flag.save
      render json: {result: true, redirect: true, redirect_path: root_path}
    else
      render json: {result: false, redirect: false}
    end
  end

end
