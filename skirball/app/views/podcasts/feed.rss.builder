xml.instruct! :xml, version: "1.0"

xml.rss "xmlns:itunes" => "http://www.itunes.com/dtds/podcast-1.0.dtd", :version => "2.0" do

  xml.channel do
    ### Common information ###
    xml.title "Hear, O Israel"
    xml.link "http://adultjewishlearning.org"
    xml.language "en-us"
    xml.description "Lectures and courses for adults in every area of Jewish study. Engaging, diverse and pluralistic. Exploring what it means to be a human being and a Jew."
    xml.itunes :author, "Skirball Center for Adult Jewish Learning at Temple Emanu-El"
    xml.itunes :owner do
      xml.itunes :name, "Skirball Center for Adult Jewish Learning at Temple Emanu-El"
      xml.itunes :email, "info@adultjewishlearning.org"
    end
    xml.itunes :subtitle, "Lectures and courses for adults in every area of Jewish study. Engaging, diverse and pluralistic. Exploring what it means to be a human being and a Jew."
    xml.itunes :summary, "Lectures and courses for adults in every area of Jewish study. Engaging, diverse and pluralistic. Exploring what it means to be a human being and a Jew."
    xml.itunes :image, {:href => "#{request.protocol}#{request.host_with_port}#{asset_path("podcast_cover.jpg")}"}
    xml.itunes :explicit, "no"

    ### Categories ###
    xml.itunes :category, {:text => "Religion & Spirituality" } do
      xml.itunes :category, { :text => "Judaism" }
    end

    ### New Feed Url ###
    xml.itunes 'new-feed-url'.to_sym, podcast_feed_url(:rss)

    ### Episodes ###
    @podcasts.each do |podcast|
      xml.item do
        xml.title  podcast.title
        xml.description  podcast.notes
        xml.itunes :subtitle, podcast.subtitle
        xml.itunes :author, "The Skirball Center for Adult Jewish Learning"
        xml.itunes :keywords, podcast.keywords
        xml.itunes :duration, podcast.duration
          xml.enclosure({
            :url => podcast_url(podcast, :format => :mp3), 
            :length => podcast.file_file_size,
            :type => podcast.file_content_type
          })

        xml.pubDate podcast.published_on.strftime("%a, %d %b %Y %H:%M:%S %z")
        xml.guid({ :isPermaLink => "false"},  podcast.guid || podcast.slug )
      end # item

    end # blog.articles.each

  end # channel

end
