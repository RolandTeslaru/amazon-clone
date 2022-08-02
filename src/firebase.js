// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA-oE-ECqqMgewmWmZrwgVPoS0WDKIopHM",
    authDomain: "clone-7e9fc.firebaseapp.com",
    projectId: "clone-7e9fc",
    storageBucket: "clone-7e9fc.appspot.com",
    messagingSenderId: "773333217671",
    appId: "1:773333217671:web:0c55044c48fce9c1026322",
    measurementId: "G-MDZDPZRDFD"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db , auth};