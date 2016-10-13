const Queue = require('firebase-queue');
const logger = require('../../utils/logger');

module.exports = class check_odd_number {
  constructor(ref) {
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
    logger.debug('TASK', {
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
    logger.debug('TASK', {
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
