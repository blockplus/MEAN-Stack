class AddDefaultQuantityToAccountCoursesAndAccountTopics < ActiveRecord::Migration
  def up
    change_column_default :account_courses, :quantity, 1
    change_column_default :account_events, :quantity, 1
    AccountCourse.where(quantity: nil).update_all(quantity: 1)
    AccountEvent.where(quantity: nil).update_all(quantity: 1)
  end

  def down
    change_column_default :account_courses, :quantity, nil
    change_column_default :account_events, :quantity, nil
    AccountCourse.where(quantity: 1).update_all(quantity: nil)
    AccountEvent.where(quantity: 1).update_all(quantity: nil)
  end
end
