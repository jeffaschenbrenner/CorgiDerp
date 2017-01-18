class Admin::FlagTypesController < AdminController
  before_action :find_flag_type, only: [:edit, :update, :destroy]

  def index
    @flagTypes = FlagType.all
  end

  def new
		@flagType = FlagType.new
	end

  def create
		@flagType = FlagType.new flag_type_params
		if @flagType.save
			redirect_to admin_flag_types_path, notice: "New Flag Type succesfully added."
		else
			render 'new'
		end
	end

	def edit
	end

	def update
		if @flagType.update flag_type_params
			redirect_to @project, notice: "Flag Type was successfully updated!"
		else
			render 'edit'
		end
	end

	def destroy
		@flagType.destroy
		redirect_to admin_flag_types_path, notice: "Flag Type destroyed."
	end

	private

	def find_project
		@flagType = FlagType.find(params[:id])
	end

	def flag_type_params
		params.require(:flag_type).permit(:name)
	end

end
