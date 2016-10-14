import { set } from 'cerebral/operators';
import get_jobs_list from './get_jobs_list';

const routed = [
  set('state:currentPage', 'jobs'),
  set('state:jobs.id', null),
  ...get_jobs_list,
];

export default routed;
