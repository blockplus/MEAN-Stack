desc 'tails the remote environment log'
task :log, roles: :app do
  run "tail -f #{shared_path}/log/#{rails_env}.log"
end
