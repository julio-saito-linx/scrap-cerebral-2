const firebase = require('firebase');
const path = require('path');
require('dotenv').config();

console.info('Initializing Firebase Queue\n');

firebase.initializeApp({
  serviceAccount: path.resolve(process.env.FIREBASE_CRED_JSON_PATH),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

require('./specs');
