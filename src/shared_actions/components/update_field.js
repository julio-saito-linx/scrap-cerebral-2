export default function update_field({ input, state }) {
  state.set(input.state_path, input.value);
  return {value: input.value};
};
