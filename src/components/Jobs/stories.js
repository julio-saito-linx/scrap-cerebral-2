import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Jobs from '../Jobs';

storiesOf('Jobs', module)
  .add('empty', () => (
    <Jobs />
  ))
;