ActiveAdmin.register AdminUser do
  menu parent: 'Accounts'  
  index do                            
    column :email                     
    column :current_sign_in_at        
    column :last_sign_in_at           
    column :sign_in_count             
    default_actions                   
  end                                 

  filter :email                       

  form do |f|                         
    f.inputs "Admin Details" do       
      f.input :email                  
      f.input :password               
      f.input :password_confirmation  
    end                               
    f.actions                         
  end
  
  show do |admin|
    attributes_table do
      row :email
      row :last_sign_in_at
      row "Last IP Address" do
        admin.last_sign_in_ip
      end
      row "Current IP Address" do
        admin.current_sign_in_ip
      end
    end
  end
end                                   
