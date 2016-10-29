export default function firebase_save_task(job_name) {
  return ({ state, path, firebase, input }) => {
    return firebase.task(job_name, { data: input.payload })
      .then(path.success)
      .catch(path.error);
  }
}
