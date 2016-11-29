#!/usr/bin/env bash

# - Elasticsearch
# - Logstash
# - Kibana

# - React storybook
# - Firebase queue server
# - Cerebral react website

#'./vendors/logstash-5.0.1/bin/logstash -f queue/utils/logstash_config_elastic.conf' \
#'./vendors/kibana-5.0.1-linux-x86_64/bin/kibana' \

./node_modules/.bin/concurrently -k -r \
'./vendors/elasticsearch-5.0.1/bin/elasticsearch && ./vendors/logstash-5.0.1/bin/logstash -f queue/utils/logstash_config_elastic.conf && ./vendors/kibana-5.0.1-linux-x86_64/bin/kibana' \
'NODE_ENV=test start-storybook -p 6006' \
'node ./scripts/wait_for_logstash.js && nodemon queue/index.js -e js -w queue' \
'node scripts/start.js'
