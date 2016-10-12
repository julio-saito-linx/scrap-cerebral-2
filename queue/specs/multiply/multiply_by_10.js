const firebase = require('firebase');
const ref = firebase.database().ref('queue');
const Queue = require('firebase-queue');

const queue = new Queue(ref, {
  specId: 'multiply_by_10',
  numWorkers: 10
}, (data, progress, resolve) => {
  console.info(`\n[multiply_by_10] starting`);

  let percentageComplete = 0;
  const interval = setInterval(() => {
    percentageComplete += 20;
    console.log({ percentageComplete }); // DEBUG
    if (percentageComplete >= 100) {
      clearInterval(interval);
      // Finish the task
      const result = {
        number: data.number * 10
      };
      console.info(`[multiply_by_10] result: ${JSON.stringify(result, null, 2)}`);
      resolve(result);
    } else {
      progress(percentageComplete);
    }
  }, 100);
});

process.on('SIGINT', () => {
  queue.shutdown().then(() => {
    console.log('[multiply_by_10] shutdown');
  });
});
