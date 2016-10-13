const glob = require('glob');
const firebase = require('firebase');
const resolvePath = require('./utils/resolvePath');
const logger = require('./utils/logger');

let queue_instances = [];

/**
 * get queue ref
 * @returns {firebase.database.Reference|!firebase.database.Reference}
 */
const firebase_init = () => {
  require('dotenv').config();
  firebase.initializeApp({
    serviceAccount: resolvePath(process.env.FIREBASE_CRED_JSON_PATH),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
  return firebase.database().ref('queue');
};

/**
 * load and save spec dinamically
 * @param ref
 * @param files
 */
const load_specs = (ref, files) => {
  let specs_map_list = {};

  // logger -----------
  logger.info('SPECS', {
    __filename,
    title: 'files_listed',
    description: 'all queue files listed',
    files,
  });
  // ------------------

  files.forEach((file) => {
    const Spec = require(file);
    specs_map_list[ Spec.get_name() ] = Spec.spec_obj();

    // store instaces for shutdown
    const spec = new Spec(ref);
    queue_instances.push(spec.queue_instance);
  });

  // logger -----------
  logger.debug('SPECS', {
    __filename,
    title: 'specs_map_list created',
    description: 'all spec files loaded',
    specs_map_list,
  });
  // ------------------

  ref.child('specs').set(specs_map_list);
};

/**
 * start here
 */
const init = () => {
  const ref = firebase_init();

  // logger -----------
  logger.debug('SPECS', {
    __filename,
    title: 'starting',
    description: 'loading all spec files',
  });
  // ------------------

  const specs_path = resolvePath('./queue/specs');
  glob(`${specs_path}/**/*.js`, (er, files) => {
    load_specs(ref, files);
  });
};

/**
 * when user press "Ctrl + C" - do a gracefully shutdown
 */
process.on('SIGINT', () => {
  // logger -----------
  logger.info('QUEUE', {
    __filename,
    title: 'shuttdown:started',
  });
  // ------------------

  const promises = queue_instances.map((queue_item) => queue_item.shutdown());
  Promise.all(promises).then(() => {
    // logger -----------
    logger.info('QUEUE', {
      __filename,
      title: 'shuttdown:success',
    });
    // ------------------
    setTimeout(() => process.exit(0), 200);
  })
});

init();
