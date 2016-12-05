function firebase_merge_item(state_path) {
  return function mergeItem({ state, input }) {
    const { key, value } = input;
    state.set(`${state_path}.${key}`, value);
    return { key };
  };
}

export default firebase_merge_item;
