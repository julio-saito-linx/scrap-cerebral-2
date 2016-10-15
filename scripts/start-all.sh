#!/usr/bin/env bash

./node_modules/.bin/concurrently -k -r -n 'logstash,kibana,storybook,QUEUE,site' \
-p '[{name}]>' \
-c 'gray,gray,green,blue,yellow.bold' \
'npm run logstash-server' \
'npm run start-kibana > /dev/null 2>&1' \
'npm run storybook' \
'npm run logstash-wait-for-server && npm run queue-local-server' \
'npm run dev-local-server'
