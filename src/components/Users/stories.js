import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Users from './index';
import { users_stub } from '../stubs/users';

storiesOf('Users', module)
  .add('3 users', () => (
    <Users
      is_loading={false}
      users_list={_.keys(users_stub)}
      users={users_stub}/>
  ))
  .add('is_loading === true', () => (
    <Users is_loading={true}/>
  ))
;