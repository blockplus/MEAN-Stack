ActiveAdmin.register Purchase do
  menu parent: 'Sales Tools', priority: 5
  
  index do
    selectable_column
    column :id, :sortable => :id do |purchase|
      link_to purchase.id, admin_purchase_path(purchase.id)
    end
    column :account do |purchase|
      link_to purchase.account.name, admin_account_path(purchase.account)
    end

    column :total, :sortable => :total do |purchase|
      number_to_currency purchase.total
    end
    column :purchase_date, :sortable => :created_at do |purchase|
      purchase.created_at
    end
    default_actions
  end

  show do |purchase|
    purchase.receipt.html_safe
  end
end
