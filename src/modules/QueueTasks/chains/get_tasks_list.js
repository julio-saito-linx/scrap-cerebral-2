import { set } from 'cerebral/operators';
import firebase_listen from '../../../shared_actions/firebase/firebase_listen';
import firebase_get_value from '../../../shared_actions/firebase/firebase_get_value';

const get_tasks_list = [
  firebase_listen('queue_tasks', 'queue.tasks'),
  firebase_get_value('queue.tasks'), {
    success: [
      set('state:queue_tasks.list', 'input:value')
    ],
    error: [],
  },
  set('state:queue_tasks.is_loading', false),
];

export default get_tasks_list;
