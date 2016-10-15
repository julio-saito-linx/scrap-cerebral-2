// chains
import routed from './chains/routed';
import routed_job_detail from './chains/routed_job_detail';
import routed_job_create from './chains/routed_job_create';
// shared actions
import firebase_merge_item from '../../../shared_actions/firebase/firebase_merge_item';
import firebase_remove_item from '../../../shared_actions/firebase/firebase_remove_item';
import update_field from '../../../shared_actions/components/update_field';
import { set } from 'cerebral/operators';

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
      url: '',
    },
  },
  routes: {
    '/': 'routed',
    '/create': 'routed_job_create',
    '/:id': 'routed_job_detail',
  },
  signals: {
    routed,
    routed_job_detail,
    routed_job_create,
    jobsChildAdded: [ firebase_merge_item('jobs.list') ],
    jobsChildChanged: [ firebase_merge_item('jobs.list') ],
    jobsChildRemoved: [ firebase_remove_item('jobs.list') ],

    fieldChanged: [ update_field ],
    saveClicked: [
      firebase_save_task_new_job, {
        success: [
          set('state:jobs.saved', true),
        ],
        error: [
          set('state:jobs.error', 'input:error'),
        ],
      }
    ],
  },
})
