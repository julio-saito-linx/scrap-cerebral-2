var tcpp = require('tcp-ping');

let count = 0;
const interval_id = setInterval(() => {
  tcpp.probe('localhost', 28777, function(err, available) {
    if (err) {
      console.error(err);
      throw err;
    }
    count++;

    if (available) {
      clearInterval(interval_id);
      process.stdout.write('ok\n');
    } else {
      process.stdout.write('.');
    }

    if (count > 60) {
      clearInterval(interval_id);
      process.stdout.write('timeout\n');
    }
  });
}, 500);
