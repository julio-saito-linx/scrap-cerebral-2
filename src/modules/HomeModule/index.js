import { set } from 'cerebral/operators';

export default (module) => {
  return {
    signals: {
      routed: [
        set('state:currentPage', 'home'),
      ],
    },
    modules: {},
  }
}
