const glob = require('glob');
const firebase = require('firebase');
const resolvePath = require('./utils/resolvePath');
const logger = require('./utils/logger');

require('dotenv').config();
firebase.initializeApp({
  serviceAccount: resolvePath(process.env.FIREBASE_CRED_JSON_PATH),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});
const ref = firebase.database().ref('queue');

const specs_map_list = {};
const queue_instances = [];

// options is optional
// const specs_path = resolvePath('./queue/specs');
// glob(`${specs_path}/**/*.js`, (er, files) => {
glob(`/home/julio/_git/scrap-cerebral-2/queue/specs/get_if_odd/check_odd_number.js`, (er, files) => {
  logger.log('verbose', 'spec:files', {files});
  files.map((file) => {
    const Spec = require(file);
    specs_map_list[Spec.get_name()] = Spec.spec_obj();

    // store instaces for shutdown
    const spec = new Spec(ref);
    queue_instances.push(spec.queue_instance);
  });
  logger.log('verbose', 'firebase:set:specs', {specs_map_list});
  ref.child('specs').set(specs_map_list);
});

process.on('SIGINT', () => {
  logger.log('info', 'shuttdown:start');
  const promises = queue_instances.map((queue_item) => queue_item.shutdown());
  Promise.all(promises).then(() => {
    logger.log('info', 'shuttdown:success');
    setTimeout(() => process.exit(0), 200);

  })
});

// {
//   // Multiply by 10
//   multiply_by_10: {
//     start_state: 'spec_multiply_by_10',
//     in_progress_state: 'multiply_by_10_in_progress',
//     finished_state: 'multiply_by_10_finished',
//     timeout: 10000
//   },
//   print_number: {
//     start_state: 'multiply_by_10_finished',
//     in_progress_state: 'print_number_in_progress',
//     timeout: 10000,
//   },
//
//   // Odd Numbers
//   check_odd_number: {
//     start_state: 'spec_check_odd_number',
//     in_progress_state: 'check_odd_number_in_progress',
//     finished_state: 'check_odd_number_finished',
//     timeout: 10000
//   },
//   show_odd_number: {
//     start_state: 'check_odd_number_finished',
//     in_progress_state: 'show_odd_number_in_progress',
//     timeout: 10000
//   },
//
//   // Crawler
//   // crawler_web_page: {
//   //   start_state: 'crawler_web_page',
//   //   in_progress_state: 'crawler_web_page_in_progress',
//   //   timeout: 10000
//   // },
// });
