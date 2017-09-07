## Notes

* Always use `bundle exec` before a command, e.g. `bundle exec cap log`.
* The staging environment is the default. `cap deploy bash` is the same as `cap deploy staging bash`
* Capistrano hides all the SSH and environment stuff under the hood.
* Unicorn is the gem responsible for running the application. It's the same as running `rails s`
* Capistrano commands can be chained together like this: `bundle exec cap deploy deploy:migrate`. This will run `deploy:migrate` immediately after `deploy` finishes.
* Look through the files in config/recipes to see the other commands that are available.
* For any of these to work, your ssh public key needs to be added to the `deployer` user's authorized keys file, found in `~/.ssh/authorized_keys`

## Helpful Capistrano Commands

These are some of my go-to capistrano commands that make working on the Skirball app easier. 

* `-vT`
* `deploy`
* `deploy:migrate`
* `console`
* `dbconsole`
* `bash`
* `log`
* `unicorn:restart`
* `unicorn:stop`
* `unicorn:start`
* `figaro:setup`

### `bundle exec cap -vT`
List all available commands

### `bundle exec cap deploy`
Deploy the code to the server and restart the application

### `bundle exec cap deploy:migrate`
Run a migration on the server

### `bundle exec cap console`
Open up a Rails console on the server

### `bundle exec cap dbconsole`
Open up a Postgres console on the server

### `bundle exec cap bash`
SSH into the server as the `deployer` user and switch to the current application directory. Great for when you need to run a rake command or some other unix-y task.

### `bundle exec cap log`
Tails the log of the Rails app on the server. Extrememly helpful with debugging.

### `bundle exec cap unicorn:restart`
Restarts the application on the server.

### `bundle exec cap unicorn:stop unicorn:start`
A more heavy-handed approach to restart the Rails application on the server

### `bundle exec cap figaro:setup`
Copies the application config file found in `config/recipes/templates/application.yml.erb`
