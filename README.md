# Scrap Cerebral 2

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### run dev

####Install:

```shell
yarn
# or npm install

# edit your .env file

./scripts/start-all.sh
```

(optional) If you want you can do professional logging installing **ElasticSearch**, **Logstash** and **Kibana**.

## libs used

#### Site

- [cerebral 2](http://cerebral.github.io/cerebral-website)
- [cerebral-module-router](http://cerebral.github.io/cerebral-module-router/index.html#_index_d_.router.redirect)
- [cerebral-provider-firebase](https://github.com/cerebral/cerebral-provider-firebase)
- [firebase.database](https://firebase.google.com/docs/reference/node/firebase.database.Reference)
- [storybooks.io](https://storybooks.io/)
- [create-react-app](https://github.com/facebookincubator/create-react-app)

#### Server

- [firebase-queue](https://github.com/firebase/firebase-queue)
- [logstash](https://www.elastic.co/products/logstash)
- [elasticsearch](https://www.elastic.co/products/elasticsearch)
- [kibana](https://www.elastic.co/products/kibana)

# personal reffs

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

_This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)._
