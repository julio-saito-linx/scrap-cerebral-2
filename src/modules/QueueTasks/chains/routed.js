import { set } from 'cerebral/operators';
import get_tasks_list from './get_tasks_list';

const routed = [
  set('state:currentPage', 'queue_tasks'),
  set('state:queue_tasks.is_loading', true),
  set('state:queue_tasks.selected_task_key', null),
  ...get_tasks_list,
];

export default routed;
