// chains
import routed from './chains/routed';
// shared actions
import firebase_merge_item from '../../shared_actions/firebase/firebase_merge_item';
import firebase_remove_item from '../../shared_actions/firebase/firebase_remove_item';
// actions
import { set } from 'cerebral/operators';
import firebase_remove_task from './actions/firebase_remove_task';

export default module => ({
  state: {
    selected_task_key: null,
    list: {},
    list_limit: 10,
    is_loading: false,
    is_logged: false,
  },
  routes: {
    '/': 'routed',
    // '/:uid': 'routed_user_detail',
  },
  signals: {
    routed,
    taskSelected: [ set('state:queue_errors.selected_task_key', 'input:selected_task_key') ],
    queueRemoveClicked: [ firebase_remove_task ],
    queue_tasks_ChildAdded: [ firebase_merge_item('queue_errors.list') ],
    queue_tasks_ChildChanged: [ firebase_merge_item('queue_errors.list') ],
    queue_tasks_ChildRemoved: [ firebase_remove_item('queue_errors.list') ],
  },
})
