#!/usr/bin/env bash
git reset --hard HEAD
git checkout development
git pull
npm install
bower install
gulp development
rm -Rf /opt/mondayreplay/dev_application/mondayreplay-web-enduser
mv dist/ /opt/mondayreplay/dev_application/mondayreplay-web-enduser
