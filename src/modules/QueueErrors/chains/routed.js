import { set } from 'cerebral/operators';
import firebase_listen from '../../../shared_actions/firebase/firebase_listen';
import firebase_get_value from '../../../shared_actions/firebase/firebase_get_value';

const routed = [
  set('state:currentPage', 'queue_errors'),
  // set('state:queue_errors.uid', null),
  firebase_listen('queue.tasks'),
  firebase_get_value('queue.tasks'), {
    success: [
      set('state:queue_errors.list', 'input:value')
    ],
    error: [],
  },
  set('state:queue_errors.is_loading', false),
];

export default routed;
