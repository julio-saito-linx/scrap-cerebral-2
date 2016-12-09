const got = require('got');

module.exports = function get_html(url) {
  return got(url)
    .then(response => {
      return response.body;
    });
};
