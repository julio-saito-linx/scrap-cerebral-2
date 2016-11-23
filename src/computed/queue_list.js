import {Computed} from 'cerebral'

export default Computed({
  limit: 'queue_tasks.list_limit',
  items: 'queue_tasks.list'
}, ({limit, items}) => {
  if (!items) {
    return [];
  }
  return Object.keys(items).filter((item, index) => index < limit)
})
