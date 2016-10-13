import { set, when } from 'cerebral/operators';
import get_users_list from './get_users_list';
import login from './login';
import set_selected_user from '../actions/set_selected_user';

const routed_user_detail = [
  set('state:currentPage', 'user_detail'),
  when('state:users.is_logged'), {
    true: [],
    false: [
      ...login,
      ...get_users_list,
    ]
  },
  set_selected_user,
];

export default routed_user_detail;