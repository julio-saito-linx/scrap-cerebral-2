import { set, state } from 'cerebral/operators';

const routed = [
  set(state`currentPage`, 'queue_tasks'),
  set(state`queue_tasks.selected_task_key`, null),
];

export default routed;
