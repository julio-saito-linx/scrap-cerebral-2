import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Main from './index';

storiesOf('Main', module)
  .add('currentPage="home"', () => (
    <Main currentPage="home"/>
  ))
  .add('currentPage="display_my_name"', () => (
    <Main currentPage="display_my_name"/>
  ))
;
