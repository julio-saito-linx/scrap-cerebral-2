const got = require('got'); // https://www.npmjs.com/package/got

module.exports = function get_html(url) {
  return got(url)
    .then(response => {
      console.log(`\n-------\nresponse.body`); // DEBUG
      console.log(response.body); // DEBUG
      return response.body;
    });
};
