import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Users from './index';
import { users_stub } from '../stubs/users';

console.log({"_.keys(users_stub)": _.keys(users_stub)}); // DEBUG
console.log({"users_stub": users_stub}); // DEBUG



storiesOf('Users', module)
  .add('is_loading === true', () => (
    <Users is_loading={true}/>
  ))
  .add('is_loading === false', () => (
    <Users
      is_loading={false}
      users_list={_.keys(users_stub)}
      users={users_stub}/>
  ))
;