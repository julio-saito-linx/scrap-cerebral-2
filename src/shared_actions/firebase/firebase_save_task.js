import * as _ from 'lodash';

export default function firebase_save_task(spec_name) {
  return ({ state, path, firebase, input }) => {
    const payload = _.merge({}, {
        updated_at: { ".sv": "timestamp" },
        created_at: { ".sv": "timestamp" },
      },
      input.payload);
    return firebase.task(spec_name, payload)
      .then(path.success)
      .catch(path.error);
  }
}
