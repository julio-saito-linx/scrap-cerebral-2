import { set } from 'cerebral/operators';
import update_my_name from './chains/update_my_name'
import clear_my_name from './chains/clear_my_name'

export default (module) => {
  return {
    state: {
      my_name: '',
    },
    routes: {
      '/': 'routed'
    },
    signals: {
      my_name_changed: update_my_name,
      button_clicked: clear_my_name,
      routed: [
        set('state:currentPage', 'display_my_name'),
      ],
    },
  }
}
