class Account::PurchasesController < Account::BaseController
  def index
    # @purchases = @account.purchases
  end

  def edit
  end

  def show
  end

  def update
    @purchase.update_attributes(params[:purchase])
  end
  
  private
  def get_purchase
    @purchase = Purchase.find(params[:id])
  end
end
