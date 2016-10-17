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
import set_selected_job from './actions/set_selected_job';

function firebase_save_job({ state, path, firebase }) {
  const new_job = state.get('jobs.new_job');
  const selected_job = state.get('jobs.selected_job');

  // TODO: add uid
  let paylod;
  if (selected_job) {
    paylod = state.get('jobs.selected_job');
  } else {
    paylod = state.get('jobs.new_job')
  }

  return firebase.task('spec__job_update', paylod)
    .then((result) => {
      return path.success();
    })
    .catch((error) => {
      return path.error();
    });
}

function fb_task_job_remove({ state, path, firebase }) {
  return firebase.task('spec__job_remove', {
    id: state.get('jobs.selected_job.id'),
  })
    .then(path.success)
    .catch(path.error);
}

const EMPTY_JOB = {
  job_name: '',
  initial_spec_state: '',
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
    jobsChildAdded: [ firebase_merge_item('jobs.list') ],
    jobsChildChanged: [ firebase_merge_item('jobs.list') ],
    jobsChildRemoved: [ firebase_remove_item('jobs.list') ],

    fieldChanged: [ update_field ],
    saveClicked: [
      firebase_save_job, {
        success: [
          set('state:jobs.new_job', EMPTY_JOB),
          set('state:jobs.selected_job', null),
          set('state:jobs.saved', true),
          redirect('/jobs'),
        ],
        error: [
          set('state:jobs.error', 'input:error'),
        ],
      }
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
    jobRemoveClicked: [
      set_selected_job,
      fb_task_job_remove, {
        success: [
          // set('state:jobs.saved', true),
          // redirect('/jobs'),
          // set('state:currentPage', 'jobs'),
        ],
        error: [
          set('state:jobs.error', 'JOB ERROR'),
        ],
      },
      set('state:jobs.selected_job', null),
    ],
  },
})
