import {Computed} from 'cerebral'

export default Computed({
  limit: 'queue.list_limit',
  items: 'queue.list.*'
}, ({limit, items}) => {
  if (!items) {
    return [];
  }
  return Object.keys(items).filter((item, index) => index < limit)
})
