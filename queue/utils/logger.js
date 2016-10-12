const winston = require('winston');
const resolvePath = require('../utils/resolvePath');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'verbose',
      colorize: true,
    }),
    new (winston.transports.File)({
      handleExceptions: true,
      filename: resolvePath('./logs/queue.log'),
      level: 'info'
    })
  ]
});

module.exports = logger;
