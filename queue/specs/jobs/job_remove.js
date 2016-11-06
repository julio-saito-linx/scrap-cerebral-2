const firebase = require('firebase');
const Queue = require('firebase-queue');
const _ = require('lodash');

module.exports = class job_remove {
  constructor(logger) {
    job_remove.logger = logger;
    this.queue = new Queue(firebase.database().ref('queue'), {
      specId: 'job_remove',
      numWorkers: 3
    }, (...args) => job_remove.task(...args));
  }

  get queue_instance() {
    return this.queue;
  }

  static get_name() {
    return 'job_remove';
  }

  static spec_obj() {
    return {
      start_state: 'spec__job_remove',
      in_progress_state: 'spec__job_remove_in_progress',
      finished_state: null,
      timeout: 10000
    };
  }

  static task(payload, progress, resolve, reject) {
    // logger -----------
    job_remove.logger.debug('TASK', {
      __filename,
      name: 'job_remove',
      state: 'starting',
      payload,
    });
    // ------------------

    const updates = {};
    updates[ `/jobs/${payload.job_key}` ] = null;

    // Send to firebase
    return firebase.database().ref().update(updates)
      .then((res) => {
        // logger -----------
        job_remove.logger.debug('TASK', {
          __filename,
          name: 'job_remove',
          state: 'finished',
          payload,
          res
        });
        // ------------------
        return resolve(res);
      })
      .catch((err) => {
        // logger -----------
        job_remove.logger.debug('TASK', {
          __filename,
          name: 'job_remove',
          state: 'error',
          payload,
          err,
        });
        // ------------------
        return reject(err)
      });
  }
};
