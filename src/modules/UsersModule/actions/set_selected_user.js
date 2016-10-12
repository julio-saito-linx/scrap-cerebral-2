function set_selected_user({ input, state }) {
  const user = state.get(`users.list.${input.uid}`);
  state.set('users.selected_user', user);
}

export default set_selected_user;
