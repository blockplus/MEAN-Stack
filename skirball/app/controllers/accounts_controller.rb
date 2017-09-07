class AccountsController < ApplicationController
  before_filter :require_login, :except => [:new, :create]
  before_filter :find_account, :except => [:new, :create]
  def new
    @account = Account.new
  end

  def create
    @account = Account.new(params[:account])
    if @account.save
      login @account
    else
      @class = "page full nobackground"
      render 'sessions/new'
    end
  end

  def edit
  end

  def update
    @account.update_attributes(params[:account])
    redirect_to :account
  end

  def destroy
    @account.destroy
  end

  def show
    @class = "page full nobackground"
    @semesters = @account.courses.group_by{ |c| c.semester.title }
  end
  
  private
  def find_account
    @account = current_account
  end
end
