import React from 'react';
import { storiesOf } from '@kadira/storybook';
import JobItem from './index';
import { job_stub } from '../../../stubs/jobs';

storiesOf('Jobs.JobItem', module)
  .add('Extract post from site 1', () => (
    <JobItem job={job_stub}/>
  ))
;