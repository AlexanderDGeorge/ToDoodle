import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDi83sli5-EdNUjSKrmZCWxPf3c6XJuZ9o",
    authDomain: "todoodle-80179.firebaseapp.com",
    databaseURL: "https://todoodle-80179.firebaseio.com",
    projectId: "todoodle-80179",
    storageBucket: "todoodle-80179.appspot.com",
    messagingSenderId: "1057772686155",
    appId: "1:1057772686155:web:819b56a37fc965c02b36ce",
    measurementId: "G-8S10TPLH12",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// export const storageRef = firebase.storage().ref();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const fieldValue = firebase.firestore.FieldValue;
