import { set } from 'cerebral/operators';
// import get_jobs_list from './get_jobs_list';
// import set_selected_job from '../actions/set_selected_job';

const routed_jobs_add = [
  set('state:currentPage', 'jobs_add_edit'),
  set('state:jobs.selected_job', null),
];

export default routed_jobs_add;
