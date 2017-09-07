class TeachersController < ApplicationController
  def index
    @class = "page full"
    @teachers = Teacher.live.sort_by{ |teacher| teacher.last_name }
  end

  def show
    @teacher = Teacher.find(params[:id])
    @teachers = Teacher.live.sort_by{ |teacher| teacher.last_name }
  end
end
