import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Jobs from './index';

storiesOf('Jobs', module)
  .add('is_loading === true', () => (
    <Jobs is_loading={true} />
  ))
  .add('is_loading === false', () => (
    <Jobs is_loading={false} jobs_list={[]} />
  ))
;