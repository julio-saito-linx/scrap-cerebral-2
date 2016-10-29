export default function get_payload_job_id(state_path) {
  return function ({ state }) {
    return {
      payload: state.get(state_path),
    };
  }
}


