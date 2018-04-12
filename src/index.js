import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDFFh8Zn5WkgJeShKw_IbZY8GhA2h65iWA",
    authDomain: "ken-info343-final.firebaseapp.com",
    databaseURL: "https://ken-info343-final.firebaseio.com",
    projectId: "ken-info343-final",
    storageBucket: "ken-info343-final.appspot.com",
    messagingSenderId: "632212532966"
  };
  
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
