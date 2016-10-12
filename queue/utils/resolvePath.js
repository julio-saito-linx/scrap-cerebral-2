const fs = require('fs');
const path = require('path');

var appDirectory = fs.realpathSync(process.cwd());

module.exports = function resolvePath(relativePath) {
  return path.resolve(appDirectory, relativePath);
};
