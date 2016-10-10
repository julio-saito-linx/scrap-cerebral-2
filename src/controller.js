import { Controller } from 'cerebral';
import Devtools from 'cerebral/devtools';
import Router from 'cerebral/router';
import HomeModule from './modules/HomeModule';
import DisplayMyNameModule from './modules/DisplayMyNameModule';

const controller = Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools(),

  modules: {
    display_my_name: DisplayMyNameModule,
    home: HomeModule,
  },

  state: {
    currentPage: 'home'
  },

  router: Router({
    query: false, // Query support
    onlyHash: false, // Use hash urls
    baseUrl: '' // Only handle url changes on nested path
  }),

  routes: {
    '/': 'home.routed',
  }

});

export default controller;
