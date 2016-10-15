#!/usr/bin/env bash

./node_modules/.bin/concurrently -k -n 'logstash,storybook,QUEUE,site' \
-p '[{name}]>' \
-c 'gray,green,blue,yellow.bold' \
'npm run logstash-server' \
'npm run storybook' \
'npm run queue-local-server' \
'npm run logstash-wait-for-server && npm run dev-local-server'
