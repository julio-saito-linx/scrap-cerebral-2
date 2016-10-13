function firebase_remove_item(state_path) {
  return function removeItem({ input, state }) {
    state.unset(`${state_path}.${input.key || input.id}`);
  };
}

export default firebase_remove_item;
