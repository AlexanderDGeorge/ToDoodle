import { auth, firestore, googleProvider } from "../firebase";

export interface UserData {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export const logIn = async (userData: UserData) => {
    await auth().signInWithEmailAndPassword(userData.email, userData.password);
};

export const signInWithGoogle = async () => {
    const { user } = await auth().signInWithPopup(googleProvider);
    if (user) {
        const userRef = firestore().collection("users").doc(user.uid);
        if ((await userRef.get()).exists) {
            // handle errors
            console.log("Error: this account already exists");
        } else {
            return await createUserDocumentFromGoogle(user);
        }
    } else {
        // handle errors
        console.log("Error: unable to fetch user");
    }
};

export const signUp = async (userData: UserData) => {
    try {
        const { user } = await auth().createUserWithEmailAndPassword(
            userData.email,
            userData.password
        );
        return await createUserDocument(userData, user);
    } catch (error) {
        console.error(error.message);
    }
};

const createUserDocument = async (
    userData: UserData,
    user: firebase.User | null
) => {
    if (!user) return;
    const { firstName, lastName, email } = userData;
    const userRef = firestore().collection("users").doc(user.uid);
    await userRef.set({
        id: user.uid,
        firstName,
        lastName,
        email,
        toDos: [],
    });
    return (await userRef.get()).data();
};

const createUserDocumentFromGoogle = async (user: firebase.User) => {
    if (!user) return;
    const userRef = firestore().collection("users").doc(user.uid);
};
