require 'nokogiri'

desc "Import Podcasts"
namespace :podcasts do
  task :import => :environment do
    feed = Nokogiri::XML(Net::HTTP.get(URI('http://adultjewishlearning.org/podcastsNew.xml')))
    entries = feed.xpath('//item')
    entries.each_with_index do |entry, i|
      print "(#{i+1}/#{entries.count}) Importing #{entry.xpath('title').text}..."
      Podcast.create(
        title: entry.xpath('title').text,
        notes: entry.xpath('description').text,
        published_on: entry.xpath('pubDate').text,
        keywords: entry.xpath('itunes:keywords').text,
        subtitle: entry.xpath('itunes:subtitle').text,
        guid: entry.xpath('guid').text,
        duration: entry.xpath('itunes:duration').text,
        file_remote_url: entry.xpath('enclosure/@url').text
      )
      puts "Done!"
    end
  end

  task :import_remaining => :environment do
    feed = Nokogiri::XML(Net::HTTP.get(URI('http://adultjewishlearning.org/podcastsNew.xml')))
    entries = feed.xpath('//item')
    entries.each_with_index do |entry, i|
      if Podcast.find_by_guid(entry.xpath('guid').text)
        puts "(#{i+1}/#{entries.count}) #{entry.xpath('title').text} already exists!"
      else
        print "(#{i+1}/#{entries.count}) Importing #{entry.xpath('title').text}..."
        Podcast.create(
          title: entry.xpath('title').text,
          notes: entry.xpath('description').text,
          published_on: entry.xpath('pubDate').text,
          keywords: entry.xpath('itunes:keywords').text,
          subtitle: entry.xpath('itunes:subtitle').text,
          guid: entry.xpath('guid').text,
          duration: entry.xpath('itunes:duration').text,
          file_remote_url: entry.xpath('enclosure/@url').text
        )
        puts "Done!"
      end
    end
  end
end



