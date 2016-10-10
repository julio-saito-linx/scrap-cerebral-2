function firebase_merge_item(state_path) {
  return function mergeItem({ state, path, input }) {
    const { key, value } = input;
    const newItem = {};
    newItem[ key ] = value;

    state.merge(state_path, newItem);
    path({ key });
  };
}

export default firebase_merge_item;
