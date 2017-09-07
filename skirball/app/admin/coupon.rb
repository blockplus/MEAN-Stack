ActiveAdmin.register Coupon, as: "Discount" do
  menu parent: 'Sales Tools', priority: 15
  
  index do
    selectable_column
    column :title
    column :rule, :sortable => :amount do |coupon|
      humanize_discount coupon
    end
    column :created_at
    column :updated_at
    default_actions
  end
  
  form do |f|
    f.inputs do
      f.input :title
      f.input :rule, :as => :select, collection: { "% Off" => :percent, "$ Off" => :amount }, include_blank: false
      f.input :amount
    end
    f.actions
  end
  
  show do |coupon|
    attributes_table do
      row :title
      row :rule do
        humanize_discount coupon
      end
      row :created_at
    end
  end
end
