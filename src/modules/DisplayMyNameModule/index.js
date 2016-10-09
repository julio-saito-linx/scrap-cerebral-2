import update_my_name from './chains/update_my_name'
import clear_my_name from './chains/clear_my_name'

export default (module) => {
  return {
    state: {
      my_name: '',
    },
    signals: {
      my_name_changed: update_my_name,
      button_clicked: clear_my_name,
    },
    modules: {}
  }
}
