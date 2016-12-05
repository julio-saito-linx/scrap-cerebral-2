function firebase_get_value(collection_name) {
  return function ({ firebase, path }) {
    return firebase.value(collection_name)
      .then((result) => {
        if (result.value === null) {
          result.value = {};
        }
        return path.success(result);
      })
      .catch(path.error);
  }
}

export default firebase_get_value;
