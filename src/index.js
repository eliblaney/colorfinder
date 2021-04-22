import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app'
import { FirebaseAuthProvider } from '@react-firebase/auth'
import reportWebVitals from './reportWebVitals'

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
require('firebase/auth')

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "research-297920.firebaseapp.com",
  projectId: "research-297920",
  storageBucket: "research-297920.appspot.com",
  messagingSenderId: "478384017047",
  appId: "1:478384017047:web:cc8cd3c6a5d49c04b9a3d2"
}

ReactDOM.render(
  <BrowserRouter>
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <App />
    </FirebaseAuthProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
