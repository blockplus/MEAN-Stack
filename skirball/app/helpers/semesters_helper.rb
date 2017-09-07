module SemestersHelper
  def pluralize_without_count(count, noun)
    if count != 0
      count == 1 ? noun : "#{noun.pluralize}"
    end
  end
end
