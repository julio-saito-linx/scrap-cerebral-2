import { set } from 'cerebral/operators';

// chains
import routed from './chains/routed';
import routed_jobs_add from './chains/routed_jobs_add';
import routed_job_edit from './chains/routed_jobs_edit';

// shared actions
import firebase_merge_item from '../../../shared_actions/firebase/firebase_merge_item';
import firebase_remove_item from '../../../shared_actions/firebase/firebase_remove_item';
import update_field from '../../../shared_actions/components/update_field';
import get_payload_from_state from '../../../shared_actions/firebase/get_payload_from_state';
import firebase_save_task from '../../../shared_actions/firebase/firebase_save_task';

// local actions
import set_selected_job from './actions/set_selected_job';
import get_payload_job from './actions/get_payload_job';

const EMPTY_JOB = {
  job_name: '',
  jquery_selector: '',
  url: ''
};

export default module => ({
  state: {
    current_job: {},
    list: {},
    list_limit: 50,
    is_loading: false,
    is_loaded: false,

    new_job: EMPTY_JOB,
    selected_job: null,
  },
  routes: {
    '/': 'routed',
    '/add': 'routed_jobs_add',
    '/:id/edit': 'routed_job_edit',
  },
  signals: {
    routed,
    routed_jobs_add,
    routed_job_edit,
    jobs_ChildAdded: [ firebase_merge_item('jobs.list') ],
    jobs_ChildChanged: [ firebase_merge_item('jobs.list') ],
    jobs_ChildRemoved: [ firebase_remove_item('jobs.list') ],

    fieldChanged: [ update_field ],
    saveClicked: [
      get_payload_job,
      firebase_save_task('spec__job_update'), {
        success: [
          set('state:jobs.new_job', EMPTY_JOB),
          set('state:jobs.saved', true),
        ],
        error: [
          set('state:jobs.error', 'input:error'),
        ],
      }
    ],

    runClicked: [
      firebase_save_task('spec__job_run'), {
        success: [
          set_selected_job,
        ],
        error: [
          set('state:jobs.error', 'input:error'),
        ],
      }
    ],

    jobRemoveClicked: [
      set_selected_job,
      get_payload_from_state('job_key', 'jobs.selected_job.id'),
      firebase_save_task('spec__job_remove'), {
        success: [
        ],
        error: [
          set('state:jobs.error', 'JOB ERROR'),
        ],
      },
      set('state:jobs.selected_job', null),
    ],

    jobSelected: [
      set('state:jobs.new_job', EMPTY_JOB),
      set('state:jobs.selected_job', 'input:job'),
      function ({ state, router }) {
        router.redirectToSignal('jobs.routed_job_edit', {
          id: state.get('jobs.selected_job.id')
        });
      },
    ],

    redirectedToAddJob: [
      function ({ router }) {
        router.redirectToSignal('jobs.routed_jobs_add');
      },
    ],

    redirectedToList: [
      function ({ router }) {
        router.redirectToSignal('jobs.routed');
      },
    ],
  },
})
