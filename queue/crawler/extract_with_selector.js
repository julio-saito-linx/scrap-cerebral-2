const xray = require('x-ray')();

module.exports = function extract_with_selector(url, selector) {
  return new Promise((resolve, reject) => {
    xray(url, selector)((err, result) =>{
      if (err) {
        reject(err);
      }
      resolve(result); // Google
    });
  })
};

