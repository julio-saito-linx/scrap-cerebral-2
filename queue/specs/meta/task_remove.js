const firebase = require('firebase');
const Queue = require('firebase-queue');
const _ = require('lodash');

module.exports = class spec__task_remove {
  constructor(logger) {
    spec__task_remove.logger = logger;
    this.queue = new Queue(firebase.database().ref('queue'), {
      specId: 'spec__task_remove',
      numWorkers: 3
    }, (...args) => spec__task_remove.task(...args));
  }

  get queue_instance() {
    return this.queue;
  }

  static get_name() {
    return 'spec__task_remove';
  }

  static spec_obj() {
    return {
      start_state: 'spec__task_remove',
      in_progress_state: 'spec__task_remove_in_progress',
      finished_state: null,
      timeout: 10000
    };
  }

  static task(payload, progress, resolve, reject) {
    const queue_ref = firebase.database().ref('queue');

    // logger -----------
    spec__task_remove.logger.debug('TASK', {
      __filename,
      name: 'spec__task_remove',
      state: 'starting',
      payload,
    });
    // ------------------

    const updates = {};
    updates[ `/queue/tasks/${payload.task_key}` ] = null;

    // Send to firebase
    return firebase.database().ref().update(updates)
      .then((res) => {
        // logger -----------
        spec__task_remove.logger.debug('TASK', {
          __filename,
          name: 'spec__task_remove',
          state: 'finished',
          payload,
          res
        });
        // ------------------
        return resolve(res);
      })
      .catch((err) => {
        // logger -----------
        spec__task_remove.logger.debug('TASK', {
          __filename,
          name: 'spec__task_remove',
          state: 'error',
          payload,
          err,
        });
        // ------------------
        return reject(err)
      });
  }
};
