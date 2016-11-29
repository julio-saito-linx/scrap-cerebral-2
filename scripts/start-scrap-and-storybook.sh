#!/usr/bin/env bash

# - React storybook
# - Firebase queue server
# - Cerebral react website

./node_modules/.bin/concurrently -k -r \
'NODE_ENV=test start-storybook -p 6006' \
'nodemon queue/index.js -e js -w queue' \
'node scripts/start.js'
