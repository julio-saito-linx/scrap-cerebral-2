const firebase = require('firebase');
const Queue = require('firebase-queue');
const _ = require('lodash');
const get_html = require('../../crawler/get_html');

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

    job_ref.once('value')
      .then((snapshot) => {
        const job = snapshot.val();
        // logger -----------
        job_run.logger.debug('TASK', {
          __filename,
          name: 'job_run',
          state: '1 current job',
          'job.created_at': job.created_at,
          'job.id': job.id,
          'job.job_name': job.job_name,
          'job.jquery_selector': job.jquery_selector,
          'job.result.length': job.result.length
        });
        // ------------------
        return { job };
      })
      .then((context) => {
        return get_html(context.job.url)
          .then((result) => {
            context.result = result;
            // logger -----------
            job_run.logger.debug('TASK', {
              __filename,
              name: 'job_run',
              state: '2 context.result',
              'length': context.result.length
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
          'updated_job.created_at': updated_job.created_at,
          'updated_job.id': updated_job.id,
          'updated_job.job_name': updated_job.job_name,
          'updated_job.jquery_selector': updated_job.jquery_selector,
          'updated_job.result.length': updated_job.result.length
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
