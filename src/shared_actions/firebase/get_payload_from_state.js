export default function get_payload_job_id(key_name, state_path) {
  return function ({ state }) {
    let payload = {};
    payload[key_name] =  state.get(state_path);
    return { payload };
  }
}


