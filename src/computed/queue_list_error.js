import {Computed} from 'cerebral'
import * as _ from 'lodash';

export default Computed({
  items: 'queue_tasks.list'
}, ({items}) => {
  return _.filter(items, (item) => item.hasOwnProperty('_error_details'));
})
