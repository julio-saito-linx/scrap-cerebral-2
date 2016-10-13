import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Jobs from './index';
import { jobs_stub } from '../../stubs/jobs';

storiesOf('Jobs', module)
  .add('3 jobs', () => (
    <Jobs
      is_loading={false}
      jobs_list={_.keys(jobs_stub)}
      jobs={jobs_stub}/>
  ))
  .add('is_loading === true', () => (
    <Jobs is_loading={true}/>
  ))
;