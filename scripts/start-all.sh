#!/usr/bin/env bash

# - Logstash
# - Kibana
# - React storybook
# - Firebase queue server
# - Cerebral react website

#'/opt/logstash/bin/logstash -f queue/utils/logstash_config_elastic.conf' \
#'/usr/share/kibana/bin/kibana' \

./node_modules/.bin/concurrently -k -r \
'NODE_ENV=test start-storybook -p 6006' \
'nodemon queue/index.js -e js -w queue' \
'node scripts/start.js'
