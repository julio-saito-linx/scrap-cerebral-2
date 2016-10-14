// chains
import routed from './chains/routed';
import routed_job_detail from './chains/routed_job_detail';
// shared actions
import firebase_merge_item from '../../../shared_actions/firebase/firebase_merge_item';
import firebase_remove_item from '../../../shared_actions/firebase/firebase_remove_item';

export default function JobsModule(module) {
  return {
    state: {
      current_job: {},
      list: {},
      list_limit: 10,
      is_loading: false,
      is_logged: false,
    },
    routes: {
      '/': 'routed',
      '/:id': 'routed_job_detail',
    },
    signals: {
      routed,
      routed_job_detail,
      jobsChildAdded: [ firebase_merge_item('jobs.list') ],
      jobsChildChanged: [ firebase_merge_item('jobs.list') ],
      jobsChildRemoved: [ firebase_remove_item('jobs.list') ],
    },
  }
}
