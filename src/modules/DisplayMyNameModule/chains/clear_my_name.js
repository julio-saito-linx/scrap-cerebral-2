import { set } from 'cerebral/operators';

const clear_my_name = [
  set('state:display_my_name.my_name', ''),
];

export default clear_my_name;
