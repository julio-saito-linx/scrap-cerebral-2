function firebase_listen(collection_name) {
  return function ({ firebase }) {
    firebase.onChildAdded(collection_name, `${collection_name}.${collection_name}ChildAdded`,
      {
        orderByChild: 'updated_at',
        startAt: (new Date()).getTime(),
      }
    );
    firebase.onChildRemoved(collection_name, `${collection_name}.${collection_name}ChildRemoved`, {});
    firebase.onChildChanged(collection_name, `${collection_name}.${collection_name}ChildChanged`, {});
  }
}

export default firebase_listen;
