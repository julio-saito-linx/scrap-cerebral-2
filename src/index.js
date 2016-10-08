import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Controller } from 'cerebral';
import { Container } from 'cerebral/react';

const controller = Controller({
  state: {
    foo: 'bar',
  }
});

ReactDOM.render(
  <Container controller={controller}>
    <App />
  </Container>,
  document.getElementById('root')
);
