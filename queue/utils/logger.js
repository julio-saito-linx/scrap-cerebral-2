const winston = require('winston');
require('winston-logstash');
const resolvePath = require('../utils/resolvePath');
const tcpp = require('tcp-ping');

let transports;

// set initial transports
transports = [
  new (winston.transports.Console)({
    level: 'debug',
    handleExceptions: true,
    colorize: true,
  }),
  new (winston.transports.File)({
    level: 'debug',
    handleExceptions: true,
    filename: resolvePath('./app.log'),
  }),
];

const check_and_add_logstash_transport = function () {
  const logstash_port = 28777;
  tcpp.probe('localhost', logstash_port, function (err, available) {
    if (available) {
      transports.push(
        new (winston.transports.Logstash)({
          port: logstash_port,
          host: 'localhost',
          max_connect_retries: 1,
          level: 'debug',
          node_name: 'queue',
        })
      );
    } else {
      console.log(`

WARN: Cannot find Logstash on ${logstash_port}
      Logstash transport is disabled.

`);
    }
  });
};

check_and_add_logstash_transport();

const logger = new (winston.Logger)({ transports });

module.exports = logger;
