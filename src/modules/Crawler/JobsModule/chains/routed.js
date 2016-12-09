import { set, state } from 'cerebral/operators';

const routed = [
  set(state`currentPage`, 'jobs'),
  set(state`jobs.id`, null),
];

export default routed;
