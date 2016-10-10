function firebase_listen_users({ firebase }) {
  firebase.onChildAdded('users', 'users.usersChildAdded', {
    orderByChild: 'updated_at',
    startAt: (new Date()).getTime(),
  });
  firebase.onChildRemoved('users', 'users.usersChildRemoved', {});
  firebase.onChildChanged('users', 'users.usersChildChanged', {});
}

export default firebase_listen_users;
