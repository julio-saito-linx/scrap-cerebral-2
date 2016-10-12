const firebase = require('firebase');
const path = require('path');
require('dotenv').config({ silent: true });

firebase.initializeApp({
  serviceAccount: path.resolve(process.env.FIREBASE_CRED_JSON_PATH),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const ref = firebase.database().ref('queue');

// Add tasks onto the queue
let number = 1;
setTimeout(() => {
  setInterval(() => {
    number = ++number;
    console.log(`\nSEND: pushing ${number}\n`);
    ref.child('tasks').push({
      _state: 'spec__check_odd_number',
      number
    });
  }, 1000);
}, 0);
