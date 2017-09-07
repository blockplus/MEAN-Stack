class TestimonialsController < ApplicationController
  def create
    @testimonial = Testimonial.create(params[:testimonial])
  end

  def new
    @testimonial = Testimonial.new
  end

  def show
    @testimonial = Testimonial.find(params[:id])
  end
end
