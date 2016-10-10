import { set, when } from 'cerebral/operators';
import firebase_listen_users from './actions/firebase_listen_users'
import firebase_get_users from './actions/firebase_get_users'
import firebase_merge_item from './actions/firebase_merge_item';
import firebase_remove_item from './actions/firebase_remove_item';
import firebase_get_current_user from './actions/firebase_get_current_user';
import firebase_login_with_facebook from './actions/firebase_login_with_facebook';

export default function UsersModule(module) {
  return {
    state: {
      current_user: {},
      list: {},
      list_limit: 10,
      is_loading: true,
      is_logged: false,
    },
    routes: {
      '/': 'routed'
    },
    signals: {
      routed: [
        set('state:currentPage', 'users'),
        when('state:users.is_logged'), {
          true: [],
          false: [
            set('state:users.is_loading', true),
            firebase_get_current_user, {
              success: [
                set('state:users.current_user', 'input:user')
              ],
              error: [
                firebase_login_with_facebook, {
                  success: [
                    set('state:users.current_user', 'input:user')
                  ],
                  error: [],
                },
              ],
            },
            set('state:users.is_logged', true),
            firebase_listen_users,
            firebase_get_users, {
              success: [
                set('state:users.list', 'input:value')
              ],
              error: [],
            },
            set('state:users.is_loading', false),
          ]
        },
      ],
      usersChildAdded: [ firebase_merge_item('members.usersList') ],
      usersChildChanged: [ firebase_merge_item('members.usersList') ],
      usersChildRemoved: [ firebase_remove_item('members.usersList') ],
    },
  }
}
