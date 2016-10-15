import { set } from 'cerebral/operators';
// import get_jobs_list from './get_jobs_list';
// import set_selected_job from '../actions/set_selected_job';

const routed_job_detail = [
  set('state:currentPage', 'jobs_create'),
  // ...get_jobs_list,
  // set_selected_job,
];

export default routed_job_detail;
