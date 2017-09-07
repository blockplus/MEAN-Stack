set :whenever_command, "bundle exec whenever"
require "bundler/capistrano"
require "whenever/capistrano"

set :stages, %w(production staging)
set :default_stage, "staging"
require 'capistrano/ext/multistage'

load "config/recipes/assets.rb"
load "config/recipes/base"
load "config/recipes/nginx"
load "config/recipes/unicorn"
load "config/recipes/postgresql"
load "config/recipes/nodejs"
load "config/recipes/rbenv"
load "config/recipes/console"
load "config/recipes/check"
load "config/recipes/log"
load "config/recipes/figaro"
load "config/recipes/paperclip"
load "config/recipes/monit"

set :user, "deployer"
set :application, "skirball"
set :deploy_to, "/home/#{user}/apps/#{application}"
set :deploy_via, :remote_cache
set :use_sudo, false

set :scm, "git"
set :repository, "git@skirballjlc.beanstalkapp.com:/skirball.git"
set :branch, 'master'

default_run_options[:pty] = true
ssh_options[:forward_agent] = true

after "deploy", "deploy:cleanup"

require './config/boot'
require 'honeybadger/capistrano'
set :honeybadger_async_notify, true
