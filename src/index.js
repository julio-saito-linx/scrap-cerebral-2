import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Controller } from 'cerebral';
import { Container } from 'cerebral/react';
import Devtools from 'cerebral/devtools';
import {set} from 'cerebral/operators';

const controller = Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools(),
  state: {
    text: '',
  },
  signals: {
    textChanged: [
      set('state:text', 'input:text'),
    ],
    buttonClicked: [
      set('state:text', ''),
    ],
  }
});

ReactDOM.render(
  <Container controller={controller}>
    <App />
  </Container>,
  document.getElementById('root')
);
