import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Main from './index';

storiesOf('Main', module)
  .add('currentPage="jobs"', () => (
    <Main currentPage=""/>
  ))
;
