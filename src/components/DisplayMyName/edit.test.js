import React from 'react';
import {Container} from 'cerebral/react'
import ReactDOM from 'react-dom';
import Edit from './edit';
import { mount } from 'enzyme';

const getComponent = () => {
  const state = {
    display_my_name: {
      my_name: 'John Query',
    }
  };
  return mount(
    <Container state={state}>
      <Edit />
    </Container>
  );
};

describe('<Edit />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Edit />, div);
  });

  it('allows us to set props', () => {
    const wrapper = getComponent();
    expect(wrapper.find('.textValue').length).toBe(1)
  });
});
