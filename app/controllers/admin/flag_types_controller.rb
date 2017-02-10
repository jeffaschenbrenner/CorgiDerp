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
			redirect_to admin_flag_types_path, success: "New Flag Type succesfully added."
		else
			render 'new'
		end
	end

	def edit
	end

	def update
		if @flagType.update flag_type_params
			redirect_to admin_flag_types_path, flash: {success: "Flag Type was updated."}
		else
			render 'edit'
		end
	end

  def destroy
		respond_to do |format|
			if @flagType.destroy
				format.json {render json: {success: true}}
			else
				format.json {render json: {success: false, errors: @flagType.errors}}
			end
		end
	end

	private

	def find_flag_type
		@flagType = FlagType.find(params[:id])
	end

	def flag_type_params
		params.require(:flag_type).permit(:name)
	end

end
