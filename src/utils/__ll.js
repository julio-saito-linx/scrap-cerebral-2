import * as _ from 'lodash';

export default function (data, title) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  let obj = {};
  if (_.isObject(data)) {
    if (title) {
      obj[title] = data;
      console.log(obj);
      return;

    }
  }
  console.log(title, data);
}
