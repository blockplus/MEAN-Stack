ActiveAdmin.register Account do
  menu parent: 'Accounts'
  
  form do |f|
    f.inputs :name, :password, :email
    f.actions
  end
  
  filter :name
  filter :email
  filter :courses, :collection => proc { Course.all }
  filter :created_at, label: "Joined"
  
  index do
    selectable_column
    column :name
    column :email
    column "Joined", :created_at
    default_actions
  end
  
  show do |account|
    attributes_table do
      row :email
      row :name
      row :joined do
        account.created_at
      end
    end
    
    div class: "panel" do
      h3 "Courses"
      div class: "panel_contents" do
        if account.courses.present?
          div class: "attributes_table account" do
            table do
              thead do
                th "Course Title"
                th "Teacher"
                th "Semester"
                th "Purchase"
              end
              tbody do
                account.account_courses.order('created_at DESC').each do |ac|
                  tr do 
                    td link_to(ac.course.title, admin_course_url(ac.course))
                    td link_to(ac.course.teacher.name, admin_teacher_url(ac.course.teacher))
                    td link_to(ac.course.semester.name, admin_semester_url(ac.course.semester))
                    td link_to("Purchase Info", admin_purchase_url(ac.purchase))
                  end
                end
              end
            end
          end
        else
          p "It looks like #{account.name} isn't attending any courses yet."
        end
      end
    end

    if account.events.present?
      div class: "panel" do
        h3 "Events"
        div class: "panel_contents" do
          div class: "attributes_table" do
            table do
              thead do
                thead do
                  th "Event Title"
                  th "Purchase"
                end
                tbody do
                  account.account_events.each do |ae|
                    tr do
                      td link_to(ae.event.title, admin_event_url(ae.event))
                      td link_to("Purchase Info", admin_purchase_url(ae.purchase))
                    end
                  end
                end
              end
            end
          end
        end
      end
    end

    
    unless account.donations.blank?
      div class: "panel" do
        h3 "Donations"
        div class: "panel_contents" do
          div class: "attributes_table" do
            table do
              thead do
                th "Date"
                th "Amount"
              end
              tbody do
                account.donations.each do |donation|
                  tr do
                    td link_to(donation.created_at, admin_donation_url(donation))
                    td number_to_currency(donation.amount)
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
