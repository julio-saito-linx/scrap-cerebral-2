import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'cerebral/react';
import Main from './components/Main/index';
import controller from './controller';
import '../vendors/semantic/semantic.css';

ReactDOM.render(
  <Container controller={controller}>
    <Main />
  </Container>,
  document.getElementById('root')
);
