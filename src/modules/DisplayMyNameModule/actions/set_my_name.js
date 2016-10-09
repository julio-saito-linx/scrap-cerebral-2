export default function set_my_name ({input, state}) {
  state.set('display_my_name.my_name', input.value);
}