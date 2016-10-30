// chains
import routed from './chains/routed';
// shared actions
import firebase_merge_item from '../../shared_actions/firebase/firebase_merge_item';
import firebase_remove_item from '../../shared_actions/firebase/firebase_remove_item';
// actions
import { set } from 'cerebral/operators';
import firebase_save_task from '../../shared_actions/firebase/firebase_save_task';
import get_payload_from_state from '../../shared_actions/firebase/get_payload_from_state';

export default module => ({
  state: {
    selected_task_key: null,
    list: {},
    list_limit: 50,
    is_loading: false,
    is_logged: false,
  },
  routes: {
    '/': 'routed',
    // '/:uid': 'routed_user_detail',
  },
  signals: {
    routed,
    taskSelected: [ set('state:queue_tasks.selected_task_key', 'input:selected_task_key') ],
    queueRemoveClicked: [
      set('state:queue_tasks.selected_task_key', 'input:selected_task_key'),
      get_payload_from_state('task_key', 'queue_tasks.selected_task_key'),
      firebase_save_task('spec__task_remove'), {
        success: [
          // set('state:queue_tasks.saved', true),
          // redirect('/queue_tasks'),
          // set('state:currentPage', 'queue_tasks'),
        ],
        error: [
          set('state:queue_tasks.error', 'JOB ERROR'),
        ],
      },
      set('state:queue_tasks.selected_task_key', null),
    ],

    queue_tasks_ChildAdded: [ firebase_merge_item('queue_tasks.list') ],
    queue_tasks_ChildChanged: [ firebase_merge_item('queue_tasks.list') ],
    queue_tasks_ChildRemoved: [ firebase_remove_item('queue_tasks.list') ],
  },
})
