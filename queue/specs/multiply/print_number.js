const firebase = require('firebase');
const ref = firebase.database().ref('queue');
const Queue = require('firebase-queue');

const queue = new Queue(ref, {
  specId: 'print_number',
  numWorkers: 10
}, (data, progress, resolve, _reject) => {
  console.info(`\n[print_number] starting`);

  console.log(` > Final Number * 10 = ${data.number}`);

  // Finish the task
  setTimeout(() => {
    const result = null;
    console.info(`[print_number] result: ${JSON.stringify(result, null, 2)}`);
    resolve(result);
  }, 120);
});

process.on('SIGINT', () => {
  queue.shutdown().then(() => {
    console.log('[print_number] shutdown');
  });
});
