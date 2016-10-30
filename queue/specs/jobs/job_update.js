const firebase = require('firebase');
const Queue = require('firebase-queue');
const _ = require('lodash');
const LoggerUtils = require('../../utils/logger-utils');

module.exports = class job_update {
  constructor(logger) {
    job_update.logger = logger;
    this.queue = new Queue(firebase.database().ref('queue'), {
      specId: 'job_update',
      numWorkers: 3
    }, (...args) => job_update.task(...args));
  }

  get queue_instance() {
    return this.queue;
  }

  static get_name() {
    return 'job_update';
  }

  static spec_obj() {
    return {
      start_state: 'spec__job_update',
      in_progress_state: 'spec__job_update_in_progress',
      finished_state: null,
      timeout: 10000
    };
  }

  static task(payload, progress, resolve, reject) {
    job_update.logger.debug('TASK', {
      __filename,
      name: 'job_update',
      state: 'starting',
      data: payload,
    });

    let data_to_save;
    const is_inserting = !payload.job.id;
    if (is_inserting) {
      // insert
      data_to_save = {
        id: firebase.database().ref('jobs').push().key,
        created_at: payload.created_at,
        updated_at: payload.updated_at,
      }
    } else {
      // update
      data_to_save = {
        id: payload.job.id,
        updated_at: payload.updated_at,
      }
    }
    // add other fields
    data_to_save = _.merge({}, payload.job, data_to_save);

    const updates = {};
    updates[ `/jobs/${data_to_save.id}` ] = data_to_save;

    // Send to firebase
    return firebase.database().ref().update(updates)
      .then((res) => {
        // logger -----------
        job_update.logger.debug('TASK', {
          __filename,
          name: 'job_update',
          state: 'finished',
          data: payload,
          res,
        });
        // ------------------
        return resolve(res)
      })
      .catch((err) => {
        // logger -----------
        job_update.logger.debug('TASK', {
          __filename,
          name: 'job_update',
          state: 'error',
          data: payload,
          err,
        });
        // ------------------
        return reject(err)
      });
  }
};
