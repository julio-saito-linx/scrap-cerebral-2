import { set, state, when } from 'cerebral/operators';
import get_jobs_list from './get_jobs_list';
import set_selected_job from '../actions/set_selected_job';

const routed_jobs_edit = [
  set(state`currentPage`, 'jobs_add_edit'),
  when(state`jobs.is_loaded`), {
    true: [],
    false: [
      set(state`jobs.is_loading`, true),
      ...get_jobs_list,
    ]
  },
  set_selected_job,
];

export default routed_jobs_edit;
