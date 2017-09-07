class LineItemsController < ApplicationController
  before_filter :require_login
  def create
    current_cart.line_items.create(course_id: params[:course_id], fee_type: 1)
    redirect_to :cart
  end

  def update_quantity
    @line_item = LineItem.find(params[:id])
    if params[:quantity].to_i < 1
      @line_item.destroy
    else
      @line_item.update_attribute(:quantity, params[:quantity])
    end
    redirect_to :cart
  end

  def change_fee_type
    @line_item = LineItem.find(params[:id])
    @line_item.fee_type = params[:fee_type].to_i
    @line_item.save!
    redirect_to :cart
  end

  def destroy
    LineItem.find(params[:id]).destroy
    redirect_to :cart
  end
end
