// chains
import routed from './chains/routed';
import routed_user_detail from './chains/routed_user_detail';
// shared actions
import firebase_merge_item from '../../shared_actions/firebase/firebase_merge_item';
import firebase_remove_item from '../../shared_actions/firebase/firebase_remove_item';

export default module => ({
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
    routed,
    routed_user_detail,
    usersChildAdded: [ firebase_merge_item('users.list') ],
    usersChildChanged: [ firebase_merge_item('users.list') ],
    usersChildRemoved: [ firebase_remove_item('users.list') ],
  },
})
