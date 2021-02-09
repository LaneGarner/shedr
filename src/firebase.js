import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAxAEpx1aeGd7TLcVM0qjTCDKhvLRzNNb8",
    authDomain: "shedr-app.firebaseapp.com",
    databaseURL: "https://shedr-app-default-rtdb.firebaseio.com",
    projectId: "shedr-app",
    storageBucket: "shedr-app.appspot.com",
    messagingSenderId: "528085768566",
    appId: "1:528085768566:web:0522a40a856867f93fc257",
    measurementId: "G-7TPETPVZGG"
};
firebase.initializeApp(config);
export default firebase;