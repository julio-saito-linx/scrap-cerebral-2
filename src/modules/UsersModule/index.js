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
  signals: {
    routed,
    routed_user_detail,
    users_ChildAdded: [ firebase_merge_item('users.list') ],
    users_ChildChanged: [ firebase_merge_item('users.list') ],
    users_ChildRemoved: [ firebase_remove_item('users.list') ],
  },
})
