ActiveAdmin.register AccountDonation, :as => "Donation" do
  menu parent: "Sales Tools", priority: 10

  index do
    selectable_column
    column :amount do |donation|
      number_to_currency donation.donation.amount
    end
    column "Donator", :account do |donation|
      link_to donation.account.name, admin_account_path(donation.account)
    end
    column :purchase do |donation|
      link_to "Purchase Info", admin_purchase_path(donation.purchase)
    end
  end

end
