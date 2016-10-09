import { Controller } from 'cerebral';
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

export default controller;
