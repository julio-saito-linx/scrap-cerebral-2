const winston = require('winston');
const resolvePath = require('../utils/resolvePath');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'error',
      colorize: true,
    }),
    new (winston.transports.File)({
      level: 'debug',
      handleExceptions: true,
      filename: resolvePath('./logs/queue.log'),
    })
  ]
});

module.exports = logger;
