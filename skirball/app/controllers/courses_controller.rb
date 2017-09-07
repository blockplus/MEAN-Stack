class CoursesController < ApplicationController
  def index
    @courses = Course.live
    if params[:day_of_week].present?
      @courses.select!{ |c| params[:day_of_week].include?(c.day_of_week) }
    end
    if params[:time_of_day].present? && params[:time_of_day].size < 2
      if params[:time_of_day].first == 'daytime'
        @courses.select!{ |c| Time.parse(c.start_time).hour < 17 }
      elsif params[:time_of_day].first == 'evening'
        @courses.select!{ |c| Time.parse(c.start_time).hour >= 17 }
      end
    end
    @courses.sort_by!{ |course| course.class_dates.first.start_time }
    @title = "Courses at The Skirball Center for Adult Jewish Learning at Temple Emanu-El"
  end

  def show
    @course = Course.find(params[:id])
    @title = "#{@course.title} at The Skirball Center for Adult Jewish Learning at Temple Emanu-El"
    @courses = Course.live.sort_by{ |course| course.next_class_at(Date.today.beginning_of_week) }
  end

  def catalog
    @class = "page guide"
    @catalog = Catalog.order("created_at DESC").first
    respond_to do |format|
      format.html { render 'catalog' }
      format.pdf { redirect_to @catalog.pdf.s3_object.url_for(:get, :response_content_disposition => "attachment").to_s }
    end
  end

end
