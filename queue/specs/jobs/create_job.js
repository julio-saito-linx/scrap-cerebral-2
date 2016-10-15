const firebase = require('firebase');
const Queue = require('firebase-queue');

module.exports = class create_job {
  constructor(ref, logger) {
    create_job.logger = logger;
    this.queue = new Queue(ref, {
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

  static task(data, progress, resolve) {
    // logger -----------
    create_job.logger.debug('TASK', {
      __filename,
      name: 'create_job',
      state: 'starting',
      data,
    });
    // ------------------

    let result = null;
    // if (data.number % 2 === 1) {
    //   result = {
    //     number: data.number
    //   };
    // }

    // logger -----------
    create_job.logger.debug('TASK', {
      __filename,
      name: 'create_job',
      state: 'finished',
      data,
      result,
    });
    // ------------------
    resolve(result);
  }
};
