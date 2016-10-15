const Queue = require('firebase-queue');

module.exports = class check_odd_number {
  constructor(ref, logger) {
    check_odd_number.logger = logger;
    this.queue = new Queue(ref, {
      specId: 'check_odd_number',
      numWorkers: 3
    }, (...args) => check_odd_number.task(...args));
  }

  static get_name() {
    return 'check_odd_number';
  }

  get queue_instance() {
    return this.queue;
  }

  static spec_obj() {
    return {
      start_state: 'spec__check_odd_number',
      in_progress_state: 'spec__check_odd_number_in_progress',
      finished_state: 'spec__check_odd_number_finished',
      timeout: 10000
    };
  }

  static task(data, progress, resolve) {
    // logger -----------
    check_odd_number.logger.debug('TASK', {
      __filename,
      name: 'check_odd_number',
      state: 'starting',
      data,
    });
    // ------------------

    let result = null;
    if (data.number % 2 === 1) {
      result = {
        number: data.number
      };
    }

    // logger -----------
    check_odd_number.logger.debug('TASK', {
      __filename,
      name: 'check_odd_number',
      state: 'finished',
      data,
      result,
    });
    // ------------------
    resolve(result);
  }
};
