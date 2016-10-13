function firebase_get_value(collection_name) {
  return function ({ firebase, path }) {
    return firebase.value(collection_name)
      .then(path.success)
      .catch(path.error);
  }
}

export default firebase_get_value;
