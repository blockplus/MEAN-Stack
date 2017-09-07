ActiveAdmin.register Subject do
  menu parent: 'Manage Courses', priority: 15
  
  show do |subject|
    attributes_table do
      row :description
    end
    
    div class: "panel" do
      h3 "Courses"
      div class: "panel_contents" do
        if subject.courses.present?
          div class: "attributes_table" do
            table do
              thead do
                th "Course Title"
                th "Course Subjects"
                th "Semester"
                th "Attendees"
              end
              tbody do
                subject.courses.each do |course|
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
          p "It looks like there are no courses under #{subject.title}."
        end
      end
    end
  end
end