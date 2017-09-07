#!/usr/bin/env bash
git reset --hard HEAD
git checkout master
git pull
npm install
bower install
gulp production
rm -Rf /opt/mondayreplay/prod_application/mondayreplay-web-enduser
mv dist/ /opt/mondayreplay/prod_application/mondayreplay-web-enduser
