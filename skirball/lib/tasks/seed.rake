desc "Seed the development database"
namespace :seed do
  task :teachers => :environment do
    biography = %q{Instantly the captain ran forward, and in a loud voice commanded his crew to desist from hoisting the cutting-tackles, and at once cast loose the cables and chains confining the whales to the ship. "What now?" said the Guernsey-man, when the Captain had returned to them. } 
    names =["Eric Steele", "Jeff Milgrow", "Dell Fitzworth", "Nola Mancana", "Mark Drupstal", "Wilson Fisk", "Barth Manhunt", "Nelson Furtato"]
    names.each do |name|
      Teacher.create(name: name, biography: biography)
    end
  end

  task :courses => :environment do
    content = %Q{<p>These pleadings, and the counter pleadings, being duly heard, the very learned Judge in set terms decided, to wit,&mdash;That as for the boat, he awarded it to the plaintiffs, because they had merely abandoned it to save their lives; but that with regard to the controverted whale, harpoons, and line, they belonged to the defendants; the whale, because it was a Loose-Fish at the time of the final capture; and the harpoons and line because when the fish made off with them, it (the fish) acquired a property in those articles; and hence anybody who afterwards took the fish had a right to them. Now the defendants afterwards took the fish; ergo, the aforesaid articles were theirs.</p>

<p>A common man looking at this decision of the very learned Judge, might possibly object to it. But ploughed up to the primary rock of the matter, the two great principles laid down in the twin whaling laws previously quoted, and applied and elucidated by Lord Ellenborough in the above cited case; these two laws touching Fast-Fish and Loose-Fish, I say, will, on reflection, be found the fundamentals of all human jurisprudence; for notwithstanding its complicated tracery of sculpture, the Temple of the Law, like the Temple of the Philistines, has but two props to stand on.</p>

<p>Is it not a saying in every one's mouth, Possession is half of the law: that is, regardless of how the thing came into possession? But often possession is the whole of the law. What are the sinews and souls of Russian serfs and Republican slaves but Fast-Fish, whereof possession is the whole of the law? What to the rapacious landlord is the widow's last mite but a Fast-Fish? What is yonder undetected villain's marble mansion with a door-plate for a waif; what is that but a Fast-Fish? What is the ruinous discount which Mordecai, the broker, gets from poor Woebegone, the bankrupt, on a loan to keep Woebegone's family from starvation; what is that ruinous discount but a Fast-Fish? What is the Archbishop of Savesoul's income of L100,000 seized from the scant bread and cheese of hundreds of thousands of broken-backed laborers (all sure of heaven without any of Savesoul's help) what is that globular L100,000 but a Fast-Fish? What are the Duke of Dunder's hereditary towns and hamlets but Fast-Fish? What to that redoubted harpooneer, John Bull, is poor Ireland, but a Fast-Fish? What to that apostolic lancer, Brother Jonathan, is Texas but a Fast-Fish? And concerning all these, is not Possession the whole of the law?</p>}
    titles = ["Intro to Swimming", "Knife Juggling", "Professional Dentistry for Novices", "Diggin' it Up", "Napping", "Defense Against the Dark Arts", "Gardening"]
    teacher_ids = Teacher.all.map(&:id)
    semester_id = Semester.first.id
    subject_ids = Subject.all.map(&:id)
    times = %w(8:45pm 7:00pm 10:00am 3pm)

    titles.each do |title|
      Course.create({
        title: title,
        description: content,
        teacher_id: teacher_ids.sample,
        semester_id: semester_id,
        subtitle: "A subtitle for #{title}",
        subject_ids: [subject_ids.sample],
        event_attributes: {
          day_of_week: Date::DAYNAMES.sample,
          time_of_day: times.sample
        }
      })
      "#{title} created"
    end
  end
  task :videos => :environment do
    5.times do |i|
      Video.create({
        title: "Video number #{i}",
        description: "Video description",
        embed_code: %q(<iframe width="560" height="315" src="//www.youtube.com/embed/eFELXhB__Ck" frameborder="0" allowfullscreen></iframe>)
      })
    end
  end

  task :news_items => :environment do
    5.times do |i|
      NewsItem.create({
        title: "News Item #{i}",
        url: "http://google.com",
        description: "Just some test news"
      })
    end
  end
  task :suggested_donations => :environment do
    SuggestedDonation.create([
      { amount: 250000, title: "Endow a Course or Department" },
      { amount: 5000, title: "TBD" },
      { amount: 2500, title: "Bring a Visiting Academic who can enrich our intellectual endeavors during a 7 semester course" },
      { amount: 1800, title: "Join our Skirball Scholars' Society, a special circle of dedicated learners" },
      { amount: 1000, title: "Sponsor a semester-length course on a topic close to your heart, or honor a favorite teacher" },
      { amount: 360, title: "Provide a scholarship for one student to study with us for a semester" },
      { amount: 250, title: "Dedicate a Sunday Seminar in honor or memory of a loved one or in celebration of a special occasion" },
      { amount: 180, title: "Dedicate a podcast in honor or memory of a loved one or in celebration of an occasion" },
      { amount: 100, title: "Contribute funds to support or Artists' or Writers' Beit Midrash" }
    ])                         
  end
end
