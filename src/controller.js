import { Controller } from 'cerebral';
import { set, state } from 'cerebral/operators';
import Devtools from 'cerebral/devtools';
import Router from 'cerebral-router';
import FirebaseProvider from 'cerebral-provider-firebase';
import UsersModule from './modules/UsersModule';
import JobsModule from './modules/Crawler/JobsModule';
import QueueTasks from './modules/QueueTasks';
import firebase_listen from './shared_actions/firebase/firebase_listen';
import get_tasks_list from './modules/QueueTasks/chains/get_tasks_list';
import get_jobs_list from './modules/Crawler/JobsModule/chains/get_jobs_list';

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
      set(state`all_firebase_listening_loaded`, true),

      set(state`queue_tasks.is_loading`, true),
      ...get_tasks_list,
      set(state`queue_tasks.is_loading`, false),

      set(state`jobs.is_loading`, true),
      ...get_jobs_list,
      set(state`jobs.is_loading`, false),
    ],
    routed: [
      set(state`currentPage`, 'jobs'),
    ]
  },

  router: Router({
    routes: {
      '/': 'routed',
      '/users/': 'users.routed',
      '/users/:uid': 'users.routed_user_detail',
      '/queue_tasks/': 'queue_tasks.routed',
      '/jobs/': 'jobs.routed',
      '/jobs/add': 'jobs.routed_jobs_add',
      '/jobs/:id/edit': 'jobs.routed_job_edit',
    },
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
