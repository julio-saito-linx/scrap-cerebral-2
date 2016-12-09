import { set, state } from 'cerebral/operators';
import set_selected_job from '../actions/set_selected_job';

const routed_jobs_edit = [
  set(state`currentPage`, 'jobs_add_edit'),
  set_selected_job,
];

export default routed_jobs_edit;
