import React from 'react';
import { storiesOf } from '@kadira/storybook';
import JobItem from './index';
import { job_stub } from '../../../stubs/jobs';
import '../../../../../vendors/semantic/semantic.css';

storiesOf('JobItem', module)
  .add('job_1', () => (
    <JobItem job={job_stub}/>
  ))
;
