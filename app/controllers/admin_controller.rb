class AdminController < ApplicationController
  layout 'admin'
  before_filter :authenticate_user!
  before_filter :require_admin
  
  def dashboard
  end

  private

  def require_admin
    redirect_to root_path unless current_user.admin?
  end
end
