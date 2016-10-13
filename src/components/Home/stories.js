import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Home from './index';

storiesOf('Home', module)
  .add('initial', () => (
    <Home />
  ))
;
