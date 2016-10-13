import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UserItem from './index';
import { user_stub } from '../../stubs/users';

storiesOf('UserItem', module)
  .add('Julio', () => (
    <UserItem user={user_stub}/>
  ))
;