export default function set_my_name({ input, state }) {
  if (typeof input.value === 'undefined') {
    throw new Error(`must receive input.value. Received input: ${JSON.stringify(input, null, 2)}`);
  }
  state.set('display_my_name.my_name', input.value);
  return { success: true };
}