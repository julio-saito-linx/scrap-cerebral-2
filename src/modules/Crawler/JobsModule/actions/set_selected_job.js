export default function set_selected_job({ input, state }) {
  const job_id = input.id || input.payload.id;
  const job = state.get(`jobs.list.${job_id}`);
  state.set('jobs.selected_job', job);
}
