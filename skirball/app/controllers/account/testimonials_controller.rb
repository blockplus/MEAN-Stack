class Account::TestimonialsController < Account::BaseController
  before_filter :get_testimonial, :except => :index
  after_filter :redirect_to_index, :except => :index
  
  def index
    # @testimonials = @account.testimonials
  end

  def edit
  end

  def update
    @testimonial.update_attributes(params[:attribute])
  end

  def destroy
    @testimonial.destroy
  end
  
  private
  def get_testimonial
    @testimonial = Testimonial.find(params[:id])
  end
  
  def redirect_to_index
    redirect_to :account_testimonials
  end
end
