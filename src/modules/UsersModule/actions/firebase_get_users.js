function firebase_get_users({ firebase, path }) {
  return firebase.value('users')
    .then(path.success)
    .catch(path.error);
}

export default firebase_get_users;
