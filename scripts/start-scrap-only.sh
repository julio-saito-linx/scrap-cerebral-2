#!/usr/bin/env bash

# - Firebase queue server
# - Cerebral react website

./node_modules/.bin/concurrently -k -r \
'nodemon queue/index.js -e js -w queue' \
'node scripts/start.js'
