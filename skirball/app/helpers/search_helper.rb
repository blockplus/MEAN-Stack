module SearchHelper
  def render_result(result)
    case result.class.name
    when "Course"
      render partial: 'search/course', locals: { result: result } 
    when "Event"
      render partial: 'search/event', locals: { result: result } 
    when "Podcast"
      render partial: 'search/podcast', locals: { result: result } 
    when "Teacher"
      render partial: 'search/teacher', locals: { result: result } 
    when "Video"
      render partial: 'search/video', locals: { result: result } 
    when "NewsItem"
      render partial: 'search/news_item', locals: { result: result } 
    when "Page"
      render partial: 'search/page', locals: { result: result }
    end
  end
end
