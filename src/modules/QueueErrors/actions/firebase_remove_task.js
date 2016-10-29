import firebase from 'firebase';

export default function firebase_remove_task({ input, path }) {
  if (!input.key) {
    return path.error();
  }

  const updates = {};
  updates[ '/users/' + input.key ] = null;

  // Send to firebase
  return firebase.database().ref().update(updates)
    .then(path.success)
    .catch(path.error);
}
