import {Computed} from 'cerebral'

export default Computed({
  limit: 'queue_errors.list_limit',
  items: 'queue_errors.list.*'
}, ({limit, items}) => {
  if (!items) {
    return [];
  }
  return Object.keys(items).filter((item, index) => index < limit)
})
