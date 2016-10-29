import { set } from 'cerebral/operators';
import get_tasks_list from './get_tasks_list';

const routed = [
  set('state:currentPage', 'queue_errors'),
  set('state:queue_errors.is_loading', true),
  set('state:queue_errors.selected_task_key', null),
  ...get_tasks_list,
];

export default routed;
