import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
// import { User } from "./App";

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

export const auth = firebase.auth;
export const firestore = firebase.firestore;
export const googleProvider = new firebase.auth.GoogleAuthProvider();

interface User {
    firstName: string;
    lastName: string;
    email: string;
    photoURL: string;
}

export async function fetchUser(uid: string) {
    const userRef = firestore().collection("users").doc(uid);
    const user = await userRef.get();
    return user.data() ? { uid, ...user.data() } : null;
}
