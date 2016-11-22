import {Computed} from 'cerebral'

export default Computed({
  limit: 'jobs.list_limit',
  items: 'jobs.list'
}, ({limit, items}) => {
  if (!items) {
    return [];
  }
  return Object.keys(items).filter((item, index) => index < limit)
})
