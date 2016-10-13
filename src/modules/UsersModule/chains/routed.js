import { set, when } from 'cerebral/operators';
import get_users_list from './get_users_list';
import login from './login';

const routed = [
  set('state:currentPage', 'users'),
  set('state:users.uid', null),
  when('state:users.is_logged'), {
    true: [],
    false: [
      ...login,
      ...get_users_list,
    ]
  },
];

export default routed;