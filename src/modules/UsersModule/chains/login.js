import { set } from 'cerebral/operators';
import firebase_get_current_user from '../actions/firebase_get_current_user';
import firebase_login_with_facebook from '../actions/firebase_login_with_facebook';
import firebase_save_user from '../actions/firebase_save_user';

const login = [
  set('state:users.is_loading', true),
  firebase_get_current_user, {
    success: [
      set('state:users.current_user', 'input:user')
    ],
    error: [
      firebase_login_with_facebook, {
        success: [
          set('state:users.current_user', 'input:user'),
          firebase_save_user, {
            success: [],
            error: [],
          }
        ],
        error: [],
      },
    ],
  },
  set('state:users.is_logged', true),
];

export default login;