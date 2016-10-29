export default function get_payload_job_id({ state }) {
  return {
    payload: state.get('jobs.selected_job.id'),
  };
}
