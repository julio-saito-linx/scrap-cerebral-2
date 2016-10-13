import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DisplayMyName from './index';

storiesOf('DisplayMyName', module)
  .add('empty', () => (
    <DisplayMyName />
  ))
  .add('Julio', () => (
    <DisplayMyName my_name="Julio"/>
  ))
;