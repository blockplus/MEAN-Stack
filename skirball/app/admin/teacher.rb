ActiveAdmin.register Teacher do
  menu parent: 'Manage Courses', priority: 10

  scope :live, :default => true
  scope :archived
  scope :all

  batch_action :archive do |selection|
    Teacher.find(selection).each do |teacher|
      teacher.update_attribute(:archived, true)
    end
    redirect_to :back
  end

  batch_action :unarchive do |selection|
    Teacher.find(selection).each do |teacher|
      teacher.update_attribute(:archived, false)
    end
    redirect_to :back
  end

  action_item :only => [:show, :edit] do
    link_to "View Teacher", teacher_url(teacher)
    if teacher.archived?
      link_to "Unarchive", admin_teacher_path(teacher.id, teacher: {:archived => false}), :method => :put
    else
      link_to "Archive", admin_teacher_path(teacher.id, teacher: { :archived => true }), :method => :put
    end
  end
  
  form partial: 'form'
  
  index do
    selectable_column
    column :name
    column :biography do |teacher|
      teacher.biography.html_safe
    end
    column :created_at
    default_actions
  end
  
  action_item :only => :show do
    link_to "View Teacher", teacher_url(teacher)
  end
  
  show do |teacher|
    attributes_table do
      row :biography do
        teacher.biography.html_safe
      end
      row :testimonial do
        "&#8220;#{teacher.testimonial}&#8221; - <em>#{teacher.testimonial_source}</em>".html_safe
      end
    end
    
    div class: "panel" do
      h3 "Courses"
      div class: "panel_contents" do
        if teacher.courses.present?
          div class: "attributes_table" do
            table do
              thead do
                th "Course Title"
                th "Course Subjects"
                th "Semester"
                th "Attendees"
              end
              tbody do
                teacher.courses.each do |course|
                  tr do
                    td link_to(course.title, admin_course_url(course))
                    td do
                      course.subjects.map{ |subject| link_to subject.title, admin_subject_url(subject) }.to_sentence
                    end
                    td link_to(course.semester.name, admin_semester_url(course.semester))
                    td course.attendees.count
                  end
                end
              end
            end
          end
        else
          p "It looks like #{teacher.name} isn't teaching any courses yet."
        end
      end
    end
  end
end
