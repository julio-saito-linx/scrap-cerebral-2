# Scrap Cerebral 2

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

- Cerebral Controller
- Cerebral Router
- Firebase database
- Firebase auth
- Firebase hosting

_This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)._

```shell
/opt/logstash/bin/logstash

# /usr/lib/kibana/bin/kibana
sudo chown julio:julio /usr/lib/kibana/bin/kibana
sudo chown -R julio:julio /usr/lib/kibana/optimize/

# http://localhost:5601/app/kibana

# stdoutput
/opt/logstash/bin/logstash -f queue/utils/logstash_config.conf

# elatistic search
/opt/logstash/bin/logstash -f queue/utils/logstash_config_elastic.conf

rm logs/queue.log && node queue/send.js & TASK_PID=$! && node queue/index.js  && kill $TASK_PID
```
