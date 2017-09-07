class LineItem < ActiveRecord::Base
  attr_accessible :cart_id, :course_id, :quantity, :fee_type
  belongs_to :cart
  belongs_to :course
  scope :discountable, -> { LineItem.select{ |li| li.discountable? } }
  scope :nondiscountable, -> { LineItem.select{ |li| !li.discountable? } }


  def title
    course.title
  end

  def discountable?
    course.discountable?
  end

  def total
    if (self.fee_type == 1)
      course.price(false) * quantity
    else
      course.price(true) * quantity
    end
  end
end
