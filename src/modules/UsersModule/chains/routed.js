import { set, state, when } from 'cerebral/operators';
import get_users_list from './get_users_list';
import login from './login';

const routed = [
  set(state`currentPage`, 'users'),
  set(state`users.uid`, null),
  when(state`users.is_logged`), {
    true: [],
    false: [
      set(state`users.is_loading`, true),
      ...login,
      ...get_users_list,
    ]
  },
];

export default routed;
