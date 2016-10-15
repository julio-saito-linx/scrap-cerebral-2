import { set, when } from 'cerebral/operators';
import get_jobs_list from './get_jobs_list';

const routed = [
  set('state:currentPage', 'jobs'),
  set('state:jobs.id', null),
  when('state:jobs.is_loaded'), {
    true: [],
    false: [
      set('state:jobs.is_loading', true),
      ...get_jobs_list,
      set('state:jobs.is_loaded', true),
    ]
  },
];

export default routed;
