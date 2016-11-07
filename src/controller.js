import { Controller } from 'cerebral';
import { set } from 'cerebral/operators';
import Devtools from 'cerebral/devtools';
import Router from 'cerebral-router';
import FirebaseProvider from 'cerebral-provider-firebase';
import UsersModule from './modules/UsersModule';
import JobsModule from './modules/Crawler/JobsModule';
import QueueTasks from './modules/QueueTasks';
import firebase_listen from './shared_actions/firebase/firebase_listen';

const controller = Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools(),

  modules: {
    users: UsersModule,
    jobs: JobsModule,
    queue_tasks: QueueTasks,
  },

  state: {
    currentPage: 'jobs',
    all_firebase_listening_loaded: false,
  },

  signals: {
    listen_to_firebase: [
      firebase_listen('jobs', 'jobs'),
      firebase_listen('queue_tasks', 'queue.tasks', {}),
      firebase_listen('users', 'users'),
      set('state:all_firebase_listening_loaded', true),
    ]
  },

  router: Router({
    query: false, // Query support
    onlyHash: false, // Use hash urls
    baseUrl: '' // Only handle url changes on nested path
  }),

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
