import { auth, firestore, googleProvider } from "../firebase";

export interface UserData {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export const logIn = async (userData: UserData) => {
    await auth.signInWithEmailAndPassword(userData.email, userData.password);
};

export const signInWithGoogle = async () => {
    let { user } = await auth.signInWithPopup(googleProvider);
    if (user) {
        const userRef = firestore.collection("users").doc(user.uid);
        if ((await userRef.get()).exists) {
            // handle errors
            console.log("Error: this account already exists");
        } else {
            console.log("creating user");
            await createUserDocumentFromGoogle(user);
            console.log("user created");
        }
    } else {
        // handle errors
        console.log("Error: unable to fetch user");
    }
};

export const signUp = async (userData: UserData) => {
    try {
        const { user } = await auth.createUserWithEmailAndPassword(
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
    const userRef = firestore.collection("users").doc(user.uid);
    await userRef.set({
        id: user.uid,
        firstName,
        lastName,
        email,
        photoURL:
            "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg",
        lists: [],
    });
    return (await userRef.get()).data();
};

const createUserDocumentFromGoogle = async (user: firebase.User) => {
    function splitDisplayName(displayName: string | null) {
        if (!displayName) return ["Not", "Found"];
        return displayName.split(" ", 2);
    }
    const userRef = firestore.collection("users").doc(user.uid);
    const { displayName, email, photoURL } = user;
    const fullName = splitDisplayName(displayName);
    const firstName = fullName[0];
    const lastName = fullName[1];
    userRef.set({
        id: user.uid,
        firstName,
        lastName,
        email,
        photoURL,
        lists: [],
    });
};
