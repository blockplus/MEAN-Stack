module StudentsHelper
  def render_sidebar(student = nil)
    student ||= Student.order("RANDOM()").first || Student.new(quote: "I've been going to the Skirball Center for the past seven years, and I have yet to find another learning center that challenges me and makes me feel connected to Judaism like Skirball does.", attribution: "Lisa Weinberger")
    render partial: "layouts/sidebar", locals: {student: student}
  end
end
