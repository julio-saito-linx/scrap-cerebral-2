import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DisplayMyName from '../DisplayMyName/edit';

storiesOf('DisplayMyName', module)
  .add('empty', () => (
    <DisplayMyName />
  ))
  .add('Julio', () => (
    <DisplayMyName my_name="Julio"/>
  ))
;