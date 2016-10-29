var tcpp = require('tcp-ping');

let count = 0;

process.stdout.write('\nwaiting for logstash\n');

const interval_id = setInterval(() => {
  tcpp.probe('localhost', 28777, function(err, available) {
    if (err) {
      console.error(err);
      throw err;
    }
    count++;
    if (available) {
      clearInterval(interval_id);
      process.stdout.write('logstash found.\n');
    } else {
      process.stdout.write('.');
    }

    if (count > 120) {
      clearInterval(interval_id);
      process.stdout.write('timeout. logstash disabled.\n');
    }
  });
}, 1000);
