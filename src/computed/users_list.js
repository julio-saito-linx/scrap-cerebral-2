import {Computed} from 'cerebral'

export default Computed({
  limit: 'users.list_limit',
  items: 'users.list.*'
}, ({limit, items}) => {
  if (!items) {
    return [];
  }
  return Object.keys(items).filter((item, index) => index < limit)
})
