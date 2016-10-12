const firebase = require('firebase');
const ref = firebase.database().ref('queue');
const Queue = require('firebase-queue');

const queue = new Queue(ref, {
  specId: 'check_odd_number',
  numWorkers: 3
}, (data, progress, resolve) => {
  console.info(`\n[check_odd_number] starting`);
  if (data.number % 2 === 1) {
    const result = { number: data.number };
    console.info(`[check_odd_number] result: ${JSON.stringify(result, null, 2)}`);
    resolve(result);
  } else {
    resolve(null);
  }
});

process.on('SIGINT', () => {
  queue.shutdown().then(() => {
    console.log('[check_odd_number] shutdown');
  });
});
