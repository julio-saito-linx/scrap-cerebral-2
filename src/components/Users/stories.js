import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Users from '../Users';

storiesOf('Users', module)
  .add('is_loading === true', () => (
    <Users is_loading={true} />
  ))
  .add('is_loading === false', () => (
    <Users is_loading={false} users_list={[]} />
  ))
;