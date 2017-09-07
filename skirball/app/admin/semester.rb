ActiveAdmin.register Semester do
  menu parent: 'Manage Courses', priority: 5

  scope :live, :default => true
  scope :archived
  scope :all

  batch_action :archive do |selection|
    Semester.find(selection).each do |semester|
      semester.update_attribute(:archived, true)
    end
    redirect_to :back
  end

  batch_action :unarchive do |selection|
    Semester.find(selection).each do |semester|
      semester.update_attribute(:archived, false)
    end
    redirect_to :back
  end

  action_item :only => [:show, :edit] do
    link_to "View Semester", semester_url(semester)
    if semester.archived?
      link_to "Unarchive", admin_semester_path(semester.id, semester: {:archived => false}), :method => :put
    else
      link_to "Archive", admin_semester_path(semester.id, semester: { :archived => true }), :method => :put
    end
  end
  
  form do |f|
    f.inputs do
      f.input :name
      f.input :starts_at, as: :datepicker, label: "Start Date"
      f.input :ends_at, as: :datepicker, label: "End Date"
      f.input :early_bird_ends_at, as: :datepicker, label: "Early Bird Ends"
    end
    f.actions
  end
  
  index do
    selectable_column
    column :name
    column :starts_at
    column :ends_at
    default_actions
  end
  
  show do |semester|
    attributes_table do
      row :name
      row :dates do
        "From <strong>#{semester.starts_at.strftime('%A %B %-d, %Y')}</strong> to <strong>#{semester.ends_at.strftime('%A %B %-d, %Y')}</strong>".html_safe
      end
    end
    div class: "panel" do
      h3 "Courses"
      div class: "panel_contents" do
        if semester.courses.present?
          div class: "attributes_table" do
            table do
              thead do
                th "Course Title"
                th "Teacher"
              end
              tbody do
                semester.courses.each do |course|
                  tr do 
                    td link_to(course.title, admin_course_url(course))
                    td link_to(course.teacher.name, admin_teacher_url(course.teacher))
                  end
                end
              end
            end
          end
        else
          p "This semester doesn't have any courses yet."
        end
      end
    end
  end
end
