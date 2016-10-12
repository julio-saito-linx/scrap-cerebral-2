const firebase = require('firebase');
const ref = firebase.database().ref('queue');
const Queue = require('firebase-queue');

const queue = new Queue(ref, {
  specId: 'show_odd_number',
  numWorkers: 3
}, (data, progress, resolve, _reject) => {
  console.info(`\n[show_odd_number] starting`);
  if (data.number) {
    console.log(`${data.number} is odd!`);
  }
  const result = null;
  console.info(`[show_odd_number] result: ${JSON.stringify(result, null, 2)}`);
  resolve(result);
});

process.on('SIGINT', () => {
  queue.shutdown().then(() => {
    console.log('[show_odd_number] shutdown');
  });
});
