import { Controller } from 'cerebral';
import Devtools from 'cerebral/devtools';
import DisplayMyNameModule from './modules/DisplayMyNameModule';

const controller = Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools(),

  modules: {
    display_my_name: DisplayMyNameModule,
  },

});

export default controller;
