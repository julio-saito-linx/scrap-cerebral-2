import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'cerebral/react';
import App from './components/app/App';
import controller from './controller';
import './main.css';

ReactDOM.render(
  <Container controller={controller}>
    <App />
  </Container>,
  document.getElementById('root')
);
