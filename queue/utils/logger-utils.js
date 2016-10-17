const winston = require('winston');
const _ = require('lodash');
require('winston-logstash');
const resolvePath = require('../utils/resolvePath');
const tcpp = require('tcp-ping');
const chalk = require('chalk');

module.exports = class LoggerUtils {
  static transform_data_avoid_timestamp(data_to_save) {
    return _.reduce(data_to_save, (prev, curr, key) => {
      if (key !== 'updated_at' && key !== 'created_at') {
        prev[ key ] = curr;
      }
      return prev;
    }, {});
  };
};

