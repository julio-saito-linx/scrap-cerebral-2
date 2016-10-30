export default function firebase_listen(module_name, firebase_path) {
  return function ({ firebase }) {
    const signal_name = firebase_path.replace('.', '_');
    
    firebase.onChildAdded(firebase_path, `${module_name}.${signal_name}_ChildAdded`,
      {
        orderByChild: 'updated_at',
        startAt: (new Date()).getTime(),
      }
    );
    firebase.onChildRemoved(firebase_path, `${module_name}.${signal_name}_ChildRemoved`, {});
    firebase.onChildChanged(firebase_path, `${module_name}.${signal_name}_ChildChanged`, {});
  }
}
