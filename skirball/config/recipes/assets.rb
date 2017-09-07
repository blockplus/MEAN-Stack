before 'deploy:finalize_update', 'deploy:assets:symlink'
after 'deploy:update_code', 'deploy:assets:precompile'

namespace :deploy do
  namespace :assets do

    desc 'Precompile assets locally and rsync to remote'
    task :precompile, :roles => :web, except: { no_release: true } do
      from = source.next_revision(current_revision)
      if ENV['FORCE_PRECOMPILE'] || capture("cd #{latest_release} && #{source.local.log(from)} vendor/assets/ lib/assets/ app/assets/ | wc -l").to_i > 0
        run_locally "bundle exec rake assets:precompile"
        servers = find_servers :roles => :web, :except => { :no_release => true }
        servers.each do |server|
          run "rm -rf #{shared_path}/assets/*"
          run_locally %Q{rsync --verbose --recursive --times --rsh=ssh --compress --human-readable --progress public/assets #{user}@#{server}:#{shared_path}}
        end
        run_locally 'rm -rf public/assets'
      else
        logger.info "Skipping asset precompilation because there were no asset changes"
      end
    end

    task :symlink, :roles => :web, except: { no_release: true } do
      run ("rm -rf #{latest_release}/public/assets &&
            mkdir -p #{latest_release}/public &&
            mkdir -p #{shared_path}/assets &&
            ln -s #{shared_path}/assets #{latest_release}/public/assets")
    end
  end
end
