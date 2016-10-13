import { set } from 'cerebral/operators';
import firebase_listen from '../../../shared_actions/firebase/firebase_listen';
import firebase_get_value from '../../../shared_actions/firebase/firebase_get_value';

const get_users_list = [
  firebase_listen('users'),
  firebase_get_value('users'), {
    success: [
      set('state:users.list', 'input:value')
    ],
    error: [],
  },
  set('state:users.is_loading', false),
];

export default get_users_list;