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

  static task(data, progress, resolve, reject) {
    const queue_ref = firebase.database().ref('queue');

    // logger -----------
    job_remove.logger.debug('TASK', {
      __filename,
      name: 'job_remove',
      state: 'starting',
      data: _.merge({}, data, {id: data.id}),
    });
    // ------------------

    const updates = {};
    updates[ `/jobs/${data.id}` ] = null;

    // Send to firebase
    return firebase.database().ref().update(updates)
      .then((res) => {
        // logger -----------
        job_remove.logger.debug('TASK', {
          __filename,
          name: 'job_remove',
          state: 'finished',
          data,
          res
        });
        // ------------------
        return resolve(res);
      })
      .catch((err) => {
        // logger -----------
        job_update.logger.debug('TASK', {
          __filename,
          name: 'job_remove',
          state: 'error',
          data,
          err,
        });
        // ------------------
        return reject(err)
      });
  }
};
