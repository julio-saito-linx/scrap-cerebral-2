import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import InputField from './index';

storiesOf('InputField', module)
  .add('input field (controlled)', () => (
    <InputField
      title="Field Title"
      value="initial value"
      onChange={action('onChange')}
    />
  ))
;
