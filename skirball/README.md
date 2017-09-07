# Skirball Jewish Learning Center

This is the content and order management system for the Skirball Jewish Learning Center. It's a Rails 3.2.13 application running with Ruby 1.9.3-p429. 

## Development Setup

This app uses Postgresql as it's database. If you're on a Mac, the easiest way to setup the development database is with [Postgres.app](http://postgresapp.com/).

That should get postgresql installed and running. Now clone the repository.

```
git clone git@github.com:genericsteele/skirball.git
```

Move into the app directory

```
cd skirball
```

Get all your gems with bundler

```
bundle
```

Set up the databases

```
rake db:create db:migrate db:seed
```

We're using [Figaro](https://github.com/laserlemon/figaro) for application configuration, so you will need to create a config/application.yml (use application.example.yml as and example). The resulting file is already in .gitignore and shouldn't be committed to the repository.

```
cp config/application.example.yml config/application.yml
```

Now just fill out the variables and you're ready to go!
