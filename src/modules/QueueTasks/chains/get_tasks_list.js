import { set, state, input } from 'cerebral/operators';
import firebase_get_value from '../../../shared_actions/firebase/firebase_get_value';

const get_tasks_list = [
  firebase_get_value('queue.tasks'), {
    success: [
      set(state`queue_tasks.list`, input`value`)
    ],
    error: [],
  }
];

export default get_tasks_list;
