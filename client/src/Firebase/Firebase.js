import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
//import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA7QstxWWQvlEB21-h6VWS1mQBYu_Fw4m0",
    authDomain: "flicks-and-food.firebaseapp.com",
    projectId: "flicks-and-food",
    storageBucket: "flicks-and-food.appspot.com",
   // messagingSenderId: "181794792063",
    appId: "1:181794792063:web:0993ed479398616502954a",
    measurementId: "G-1QB8W52544"
  };
  
  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);

  //export default firebase;

  export const auth = firebase.auth;

  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();