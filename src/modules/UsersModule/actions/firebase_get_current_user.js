function firebase_get_current_user({ firebase, path }) {
  return firebase.getUser()
    .then(path.success)
    .catch(path.error);
}

export default firebase_get_current_user;
