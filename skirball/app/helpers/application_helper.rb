module ApplicationHelper
  def render_flash
    render partial: 'layouts/flash', locals: { flash: flash }
  end  
end
