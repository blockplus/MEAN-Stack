class Account::CoursesController < Account::BaseController
  def index
    # @courses = @account.courses
  end

  def show
    @course = Course.find(params[:id])
  end
end
