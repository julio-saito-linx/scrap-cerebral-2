export default function get_payload_job({ state }) {
  const selected_job = state.get('jobs.selected_job');
  if (selected_job) {
    return {
      payload: {
        job: selected_job
      }
    };
  } else {
    return {
      payload: {
        job: state.get('jobs.new_job')
      }
    };
  }
}
