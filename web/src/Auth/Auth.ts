import { auth, firestore, googleProvider } from "../firebase";

interface UserInfo {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

export const logIn = async (userInfo: UserInfo) => {
    await auth().signInWithEmailAndPassword(userInfo.email, userInfo.password);
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

export const signUp = async (userInfo: UserInfo) => {
    try {
        const { user } = await auth().createUserWithEmailAndPassword(
            userInfo.email,
            userInfo.password
        );
        return await createUserDocument(userInfo, user);
    } catch (error) {
        console.error(error.message);
    }
};

const createUserDocument = async (
    userInfo: UserInfo,
    user: firebase.User | null
) => {
    if (!user) return;
    const { firstName, lastName, email } = userInfo;
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
