import * as _ from 'lodash';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import QueueErrors from './index';
import { error_task_list_stub, error_task_stub } from '../stubs/queue';

storiesOf('Queue Errors', module)
  .add('3 queue', () => (
    <QueueErrors
      is_loading={false}
      queues_keys={_.keys(error_task_list_stub)}
      queues_list={error_task_list_stub}
      selected={error_task_stub}
    />
  ))
  .add('is_loading === true', () => (
    <QueueErrors is_loading={true}/>
  ))
;
