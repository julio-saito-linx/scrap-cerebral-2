var tcpp = require('tcp-ping');

let count = 0;
const interval_id = setInterval(() => {
  tcpp.probe('localhost', 28777, function(err, available) {
    if (err) {
      console.log(err); // DEBUG
    }
    count++;

    if (available) {
      clearInterval(interval_id);
      process.stdout.write('ok\n');
    } else {
      process.stdout.write('.');
    }

    if (count > 40) {
      clearInterval(interval_id);
      process.stdout.write('timeout\n');
    }
  });
}, 500);
