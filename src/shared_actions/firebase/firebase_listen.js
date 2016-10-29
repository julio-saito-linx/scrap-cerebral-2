export default function firebase_listen(module_name, collection_name) {
  return function ({ firebase }) {
    const signal_name = collection_name.replace('.', '_');

    firebase.onChildAdded(collection_name, `${module_name}.${signal_name}_ChildAdded`,
      {
        orderByChild: 'updated_at',
        startAt: (new Date()).getTime(),
      }
    );
    firebase.onChildRemoved(collection_name, `${module_name}.${signal_name}_ChildRemoved`, {});
    firebase.onChildChanged(collection_name, `${module_name}.${signal_name}_ChildChanged`, {});
  }
}
