import { Controller } from 'cerebral';
import Devtools from 'cerebral/devtools';
import Router from 'cerebral-router';
import FirebaseProvider from 'cerebral-provider-firebase';
import HomeModule from './modules/HomeModule';
import DisplayMyNameModule from './modules/DisplayMyNameModule';
import UsersModule from './modules/UsersModule';
import JobsModule from './modules/Crawler/JobsModule';
import QueueErrors from './modules/QueueErrors';

const controller = Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools(),

  modules: {
    display_my_name: DisplayMyNameModule,
    home: HomeModule,
    users: UsersModule,

    //crawler
    jobs: JobsModule,
    queue_errors: QueueErrors,
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
  },

  providers: [
    FirebaseProvider({
      config: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      },
      // When using tasks and firebase queue you can prefix
      // the specs triggered. This is useful in development
      // when multiple developers are working on the
      // same instance
      // specPrefix: 'CJ'
    })
  ],

});

export default controller;
