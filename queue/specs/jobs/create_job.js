const firebase = require('firebase');
const Queue = require('firebase-queue');
const _ = require('lodash');

module.exports = class create_job {
  constructor(logger) {
    create_job.logger = logger;
    this.queue = new Queue(firebase.database().ref('queue'), {
      specId: 'create_job',
      numWorkers: 3
    }, (...args) => create_job.task(...args));
  }

  static get_name() {
    return 'create_job';
  }

  get queue_instance() {
    return this.queue;
  }

  static spec_obj() {
    return {
      start_state: 'spec__create_job',
      in_progress_state: 'spec__create_job_in_progress',
      finished_state: null,
      timeout: 10000
    };
  }

  static task(data, progress, resolve, reject) {
    const queue_ref = firebase.database().ref('queue');
    const key = firebase.database().ref('jobs').push().key;

    // logger -----------
    create_job.logger.debug('TASK', {
      __filename,
      name: 'create_job',
      state: 'starting',
      data: _.merge({}, data, {id: key}),
    });
    // ------------------

    // add new fields
    let data_to_save = _.merge({}, data, {
      id: key,
      created_at: {".sv": "timestamp"},
      updated_at: {".sv": "timestamp"},
    });

    const updates = {};
    updates[ `/jobs/${key}` ] = data_to_save;

    // Send to firebase
    return firebase.database().ref().update(updates)
      .then((res) => {
        // logger -----------
        create_job.logger.debug('TASK', {
          __filename,
          name: 'create_job',
          state: 'finished',
        });
        // ------------------
        return resolve()
      })
      .catch(reject);
  }
};
