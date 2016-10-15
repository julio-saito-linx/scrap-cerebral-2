#!/usr/bin/env bash

# - Logstash
# - Kibana
# - React storybook
# - Firebase queue server
# - Cerebral react website

./node_modules/.bin/concurrently -k -r \
'/opt/logstash/bin/logstash -f queue/utils/logstash_config_elastic.conf' \
'/usr/lib/kibana/bin/kibana > /dev/null 2>&1' \
'NODE_ENV=test start-storybook -p 6006' \
'node ./scripts/wait_for_logstash.js && node queue/index.js' \
'node scripts/start.js'
