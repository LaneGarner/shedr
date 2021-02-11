import firebase from 'firebase'
import * as firebaseui from 'firebaseui'

import "firebase/auth"

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "shedr-app.firebaseapp.com",
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/user',
    signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ]
};

firebase.initializeApp(config);


export const auth = firebase.auth();
export default firebase;