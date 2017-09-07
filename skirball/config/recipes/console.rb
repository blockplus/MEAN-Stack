desc "Enter the rails console remotely"
task :console, roles: :app do
  run_remote "cd #{current_path} ; RAILS_ENV=#{rails_env} bundle exec rails console"
end

task :dbconsole, roles: :app do
  run_remote "cd #{current_path} ; RAILS_ENV=#{rails_env} bundle exec rails dbconsole"
end
  
desc "Enter the remote shell"
task :bash, roles: :app do
  run_remote "cd #{current_path} ; bash"
end
  
def run_remote(cmd)
  server = find_servers_for_task(current_task).first
  exec "ssh #{user}@#{server} -t '#{cmd}'"
end
