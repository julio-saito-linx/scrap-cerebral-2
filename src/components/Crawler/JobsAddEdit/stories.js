import React from 'react';
import { storiesOf } from '@kadira/storybook';
import JobsAddEdit from './index';

storiesOf('JobsAddEdit', module)
  .add('form', () => (
    <JobsAddEdit
      new_job={{
        job_name: 'Job Name',
        url: 'http://url',
      }}
    />
  ))
;
