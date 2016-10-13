import firebase from 'firebase';

export default function firebase_save_user({ input, path }) {
  // User info
  if (!input.user) {
    return path.error();
    // throw new Error('Cannot find user on input');
  }

  const key = input.user.uid || firebase.database().ref().child('users').push().key;
  const updates = {};
  updates[ '/users/' + key ] = input.user;

  // Send to firebase
  return firebase.database().ref().update(updates)
    .then(path.success)
    .catch(path.error);
}
