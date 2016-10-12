import { set, when } from 'cerebral/operators';
import firebase_listen_users from './actions/firebase_listen_users'
import firebase_get_users from './actions/firebase_get_users'
import firebase_merge_item from './actions/firebase_merge_item';
import firebase_remove_item from './actions/firebase_remove_item';
import firebase_get_current_user from './actions/firebase_get_current_user';
import firebase_login_with_facebook from './actions/firebase_login_with_facebook';
import set_selected_user from './actions/set_selected_user';
import firebase_save_user from './actions/firebase_save_user';

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

const get_users_list = [
  firebase_listen_users,
  firebase_get_users, {
    success: [
      set('state:users.list', 'input:value')
    ],
    error: [],
  },
  set('state:users.is_loading', false),
];

export default function UsersModule(module) {
  return {
    state: {
      current_user: {},
      list: {},
      list_limit: 10,
      is_loading: false,
      is_logged: false,
    },
    routes: {
      '/': 'routed',
      '/:uid': 'routed_user_detail',
    },
    signals: {
      routed: [
        set('state:currentPage', 'users'),
        set('state:users.uid', null),
        when('state:users.is_logged'), {
          true: [],
          false: [
            ...login,
            ...get_users_list,
          ]
        },
      ],
      routed_user_detail: [
        set('state:currentPage', 'user_detail'),
        when('state:users.is_logged'), {
          true: [],
          false: [
            ...login,
            ...get_users_list,
          ]
        },
        set_selected_user,
      ],
      usersChildAdded: [ firebase_merge_item('users.list') ],
      usersChildChanged: [ firebase_merge_item('users.list') ],
      usersChildRemoved: [ firebase_remove_item('users.list') ],
    },
  }
}
