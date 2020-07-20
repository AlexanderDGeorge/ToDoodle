import { auth, firestore, googleProvider } from "../firebase";

interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const signInWithGoogle = async () => {
    const { user } = await auth().signInWithPopup(googleProvider);
    console.log(user);
    if (user) {
        const userRef = await firestore()
            .collection("users")
            .doc(user.uid)
            .get();
        if (!userRef.exists) createUserDocument(user);
    }
};

export const signUp = async (newUser: NewUser) => {
    const { firstName, lastName, email, password } = newUser;
    const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
    );
    console.log(user);
};

export const createUserDocument = async (user: firebase.User) => {
    const userRef = firestore().collection("users").doc(user.uid);
};
