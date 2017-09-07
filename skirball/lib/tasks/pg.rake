desc "Backup the Postgresql Database"
namespace :pg do
  task :backup => [:environment] do
    if Rails.env.production?
      dbconfig = YAML.load(File.read(Rails.root.join("config/database.yml")))[Rails.env]
      stamp = Time.now.strftime "%Y-%m-%d_%H-%M-%S"
      path = Rails.root.join "db/backups/"
      file_name = "#{dbconfig['database']}_#{stamp}_dump.bak"
      sh "pg_dump -Fc -h localhost -U #{dbconfig['username']} #{dbconfig['database']} > #{path + file_name}"

      s3 = AWS::S3.new
      bucket = s3.buckets[ENV['S3_BUCKET']]
      backup = bucket.objects["backups/#{file_name}"].write(file: path + file_name)
      backup.copy_to("backups/#{dbconfig['database']}_latest_dump.bak")
    else
      puts "simulating backup at #{Time.now}"
    end
  end

  task :restore_latest => [:environment] do
    s3 = AWS::S3.new
    bucket = s3.buckets[ENV['S3_BUCKET']]
    latest = bucket.objects['backups/skirball_production_latest_dump.bak']
    dbconfig = YAML.load(File.read(Rails.root.join("config/database.yml")))[Rails.env]
    File.open('tmp/latest_dump.bak', 'wb') do |file|
      latest.read do |chunk|
        file.write(chunk)
      end
    end
    sh "pg_restore -c -h localhost -U #{dbconfig['username']} -d #{dbconfig['database']} tmp/latest_dump.bak" do |ok, res|
      if !ok 
        puts "Failed with status #{res.exitstatus}"
      end
    end
  end
  
  task :setup_folders => :environment do
    sh "mkdir -p #{Rails.root.join "db/backups"}"
  end
end

