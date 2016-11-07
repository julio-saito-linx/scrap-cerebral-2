const firebase = require('firebase');
const Queue = require('firebase-queue');
const _ = require('lodash');
const extract_with_selector = require('../../crawler/extract_with_selector');

module.exports = class job_run {
  constructor(logger) {
    job_run.logger = logger;
    this.queue = new Queue(firebase.database().ref('queue'), {
      specId: 'job_run',
      numWorkers: 3
    }, (...args) => job_run.task(...args));
  }

  get queue_instance() {
    return this.queue;
  }

  static get_name() {
    return 'job_run';
  }

  static spec_obj() {
    return {
      start_state: 'spec__job_run',
      in_progress_state: 'spec__job_run_in_progress',
      finished_state: null,
      timeout: 10000
    };
  }

  static task(payload, progress, resolve, reject) {
    const job_ref = firebase.database().ref(`/jobs/${payload.id}`);

    // logger -----------
    job_run.logger.debug('TASK', {
      __filename,
      name: 'job_run',
      state: 'starting',
      payload,
    });
    // ------------------

    throw new Error('TODO');

    job_ref.once('value')
      .then((snapshot) => {
        const job = snapshot.val();
        // logger -----------
        job_run.logger.debug('TASK', {
          __filename,
          name: 'job_run',
          state: '1 current job',
          job,
        });
        // ------------------
        return { job };
      })
      .then((context) => {
        return extract_with_selector(context.job.url, context.job.jquery_selector)
          .then((result) => {
            context.result = result;
            // logger -----------
            job_run.logger.debug('TASK', {
              __filename,
              name: 'job_run',
              state: '2 context.result',
              result: context.result
            });
            // ------------------
            return context;
          })
      })
      .then((context) => {
        // add other fields
        const updated_job = _.merge({}, context.job, {
          result: context.result
        });

        // logger -----------
        job_run.logger.debug('TASK', {
          __filename,
          name: 'job_run',
          state: '3 updated_job',
          updated_job
        });
        // ------------------

        const updates = {};
        updates[`/jobs/${updated_job.id}`] = updated_job;

        // Send to firebase
        return firebase.database().ref().update(updates)
      })
      .then((res) => {
        // logger -----------
        job_run.logger.debug('TASK', {
          __filename,
          name: 'job_run',
          state: 'finished',
          payload,
          res
        });
        // ------------------
        return resolve(res);
      })
      .catch((err) => {
        // logger -----------
        job_run.logger.debug('TASK', {
          __filename,
          name: 'job_run',
          state: 'error',
          payload,
          err,
        });
        // ------------------
        return reject(err)
      });
  };
};
