const winston = require('winston');
const _ = require('lodash');
require('winston-logstash');
const resolvePath = require('../utils/resolvePath');
const tcpp = require('tcp-ping');
const chalk = require('chalk');

module.exports = class Logger {
  constructor() {
    this.LOGSTASH_PORT = 28777;
    this._transports = [];
  }

  _check_logstash_port_async() {
    return new Promise((resolve, reject) => {
      const LOGSTASH_PORT = 28777;
      tcpp.probe('localhost', LOGSTASH_PORT, (err, available) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve(available);
      });
    })
  }

  init_async() {
    return this._check_logstash_port_async()
      .then((logstash_found) => {
        if (logstash_found) {
          console.log(chalk.green('\n\nlogstash=found\n\n'));
          this._transports.push(
            new (winston.transports.Logstash)({
              host: 'localhost',
              port: this.LOGSTASH_PORT,
              handleExceptions: true,
              max_connect_retries: 1,
              level: 'debug',
              node_name: 'queue',
            })
          );
        } else {
          console.log(chalk.red('\n\nlogstash=not found\n\n'));
          this._transports.push(
            new (winston.transports.Console)({
              level: 'debug',
              handleExceptions: true,
              colorize: true,
            }));

          this._transports.push(
            new (winston.transports.File)({
              level: 'debug',
              handleExceptions: true,
              filename: resolvePath('./app.log'),
            }));
        }

        return new (winston.Logger)({
          transports: this._transports
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
