// chains
import routed from './chains/routed';
import routed_jobs_add from './chains/routed_jobs_add';
import routed_job_edit from './chains/routed_jobs_edit';
// shared actions
import firebase_merge_item from '../../../shared_actions/firebase/firebase_merge_item';
import firebase_remove_item from '../../../shared_actions/firebase/firebase_remove_item';
import update_field from '../../../shared_actions/components/update_field';
import { set } from 'cerebral/operators';
import { redirect } from 'cerebral-router';
import __ll from '../../../utils/__ll';

function firebase_save_task_new_job({ state, path, firebase }) {
  return firebase.task('spec__create_job', {
    // uid: state.get('users.current_user.uid'),
    job_name: state.get('jobs.new_job.job_name'),
    initial_spec_state: state.get('jobs.new_job.initial_spec_state'),
    url: state.get('jobs.new_job.url'),
  })
    .then((result) => {
      return path.success();
    })
    .catch((error) => {
      return path.error();
    });
}

export default module => ({
  state: {
    current_job: {},
    list: {},
    list_limit: 10,
    is_loading: false,
    is_loaded: false,

    new_job: {
      job_name: '',
      initial_spec_state: '',
      url: ''
    },
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
    jobsChildAdded: [ firebase_merge_item('jobs.list') ],
    jobsChildChanged: [ firebase_merge_item('jobs.list') ],
    jobsChildRemoved: [ firebase_remove_item('jobs.list') ],

    fieldChanged: [ update_field ],
    saveClicked: [
      function (context) {
        __ll(context);
      },
      firebase_save_task_new_job, {
        success: [
          set('state:jobs.saved', true),
          redirect('/jobs'),
          // set('state:currentPage', 'jobs'),
        ],
        error: [
          set('state:jobs.error', 'input:error'),
        ],
      }
    ],
  },
})
