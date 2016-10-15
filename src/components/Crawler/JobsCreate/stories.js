import React from 'react';
import { storiesOf } from '@kadira/storybook';
import JobsCreate from './index';

storiesOf('JobsCreate', module)
  .add('form', () => (
    <JobsCreate
      new_job={{
        job_name: 'Job Name',
        initial_spec_state: 'initial_spec_state',
        url: 'http://url',
      }}
    />
  ))
;
