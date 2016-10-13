import {Computed} from 'cerebral'

export default Computed({
  limit: 'crawler.jobs.list_limit',
  items: 'crawler.jobs.list.*'
}, ({limit, items}) => {
  return Object.keys(items).filter((item, index) => index < limit)
})
