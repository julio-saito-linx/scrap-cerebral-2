const Queue = require('firebase-queue');

module.exports = class show_odd_number {
  constructor(ref, logger) {
    show_odd_number.logger = logger;
    this.queue = new Queue(ref, {
      specId: 'show_odd_number',
      numWorkers: 3
    }, (...args) => show_odd_number.task(...args));
  }

  static get_name() {
    return 'show_odd_number';
  }

  get queue_instance() {
    return this.queue;
  }

  static spec_obj() {
    return {
      start_state: 'spec__check_odd_number_finished',
      in_progress_state: 'spec__show_odd_number_in_progress',
      finished_state: null,
      timeout: 10000
    };
  }

  static task(data, progress, resolve) {
    // logger -----------
    show_odd_number.logger.debug('TASK', {
      __filename,
      name: 'show_odd_number',
      state: 'starting',
      data,
    });
    // ------------------

    let result = null;
    if (data.number) {
      console.log(`${data.number} is odd!`);
    }

    // logger -----------
    show_odd_number.logger.debug('TASK', {
      __filename,
      name: 'show_odd_number',
      state: 'finished',
      data,
      result,
    });
    // ------------------
    resolve(result);
  }
};
