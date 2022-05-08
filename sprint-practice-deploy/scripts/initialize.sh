#!/bin/bash
cd /home/ubuntu/im-sprint-practice-deploy/server
npm install
npm install pm2@latest -g #pm2@latest에서 수정해봄
sudo apt-get update
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown ubuntu /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80