# Overview

NewsServer provides images and config files with a simple express web server



# Installation
```
$ cd <path to server location>
$ npm install                    # pulls the server
$ sudo npm install pm2 -g        # pm2 runs and monitors the server - See: https://pm2.keymetrics.io/docs/usage/quick-start/
$ pm2 start server.js            # starts the node server on port 80
```
# Start at system startup
/etc/rc.local
```
cd <path to server location>
pm2 start server.js >> /home/user/logs/newserver.log 2>&1
```