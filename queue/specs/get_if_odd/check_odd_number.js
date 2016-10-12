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
      start_state: 'spec_check_odd_number',
      in_progress_state: 'check_odd_number_in_progress',
      finished_state: null,
      // finished_state: 'check_odd_number_finished',
      timeout: 10000
    };
  }

  static task(data, progress, resolve) {
    logger.verbose('[task:stated] check_odd_number', { data });
    if (data.number % 2 === 1) {
      logger.info('[task:finished] check_odd_number === ODD', { data });
      const result = { number: data.number };
      resolve(result);
    } else {
      logger.info('[task:finished] check_odd_number !== odd', { data });
      resolve(null);
    }
  }
};
