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
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export async function fetchUser(uid: string) {
    const userRef = firestore.collection("users").doc(uid);
    const user = (await userRef.get()).data();
    // return user ? Object.assign({ id: uid }, user) : null;
    return user
        ? {
              id: uid,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              photoURL: user.photoURL,
              toDos: user.toDos,
          }
        : null;
}