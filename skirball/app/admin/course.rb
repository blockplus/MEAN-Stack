ActiveAdmin.register Course do
  menu parent: 'Manage Courses', priority: 20

  scope :live, :default => true
  scope :archived
  scope :all

  batch_action :archive do |selection|
    Course.find(selection).each do |course|
      course.update_attribute(:archived, true)
    end
    redirect_to :back
  end

  batch_action :unarchive do |selection|
    Course.find(selection).each do |course|
      course.update_attribute(:archived, false)
    end
    redirect_to :back
  end

  action_item :only => [:show, :edit] do
    link_to "View Course", course_url(course)
    if course.archived?
      link_to "Unarchive", admin_course_path(course.id, course: {:archived => false}), :method => :put
    else
      link_to "Archive", admin_course_path(course.id, course: { :archived => true }), :method => :put
    end
  end
  
  form partial: 'form'
  
  index do
    selectable_column
    column :title, :sortable => :title do |course|
      link_to course.title, admin_course_url(course)
    end
    column :teachers, :sortable => 'teacher.name' do |course|
      course.teachers.map{ |teacher| link_to teacher.name, teacher_path(teacher) }.to_sentence.html_safe
    end
    column :registered do |course|
      course.account_courses.sum(&:quantity)
    end

    column :semester, sortable: 'semester.title'
    default_actions
  end
  
  
  show do |course|
    attributes_table do
      row :image do
        image_tag course.image.url
      end
      row :subtitle
      row :description do
        course.description.html_safe
      end
      row :teachers do
        course.teachers.map(&:name).to_sentence
      end
      row :semester
      row :location
      row :subjects do
        course.subjects.map{ |subject| link_to subject.title, admin_subject_url(subject) }.to_sentence.html_safe
      end


      row :standard_course_fee do
        number_to_currency course.standard_course_fee
      end

      row :temple_member_discount_fee do
        number_to_currency course.temple_member_discount_fee
      end



      row :ignore_discount
      # row :early_bird_cost do
      #   number_to_currency course.early_bird_cost
      # end
      row :state
      row :archived
      row :start_date
      row :end_date
      row :time do
        "Every #{course.day_of_week} from #{course.start_time} to #{course.end_time}"
      end
    end
    
    div class: "panel" do
      h3 "Attendees"
      div class: "panel_contents" do
        if course.accounts.present?
          div class: "attributes_table" do
            table do
              thead do
                th "Name"
                th "Email"
                th "Phone"
                th "Contact Preference"
                th "Purchase"
              end
              tbody do
                course.account_courses.each do |ac|
                  tr do
                    td link_to(ac.account.name, admin_account_url(ac.account))
                    td ac.purchase.email || ac.account.email
                    td ac.purchase.phone
                    td ac.purchase.contact_preference.try(:titleize)
                    td link_to(ac.purchase.id, ac.purchase)
                  end
                  if ac.additional_attendees.present?
                    ac.additional_attendees.each do |attendee|
                      tr do
                        td "+ " + attendee['name']
                        td attendee['email']
                        td attendee['phone']
                        td
                        td link_to(ac.purchase.id, ac.purchase)
                      end
                    end
                  end
                end
              end
            end
          end
        else
          p "It looks like there are no attendees yet."
        end
      end
    end
  end
end
