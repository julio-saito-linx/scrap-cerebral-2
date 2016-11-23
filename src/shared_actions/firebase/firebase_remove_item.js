function firebase_remove_item(state_path) {
  return function removeItem({ input, state }) {
    const exists = state.get(state_path) && state.get(`${state_path}.${input.key || input.id}`);
    if (exists) {
      state.unset(`${state_path}.${input.key || input.id}`);
    }
  };
}

export default firebase_remove_item;
