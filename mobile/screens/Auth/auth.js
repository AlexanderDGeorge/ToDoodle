import { googleProvider, auth, firestore } from "../../firebase";

export const signInWithGoogle = async () => {
    return auth.signInWithPopup(googleProvider).then(({ user }) => {
        createUser(user);
    });
};

export const signOut = () => {
    auth.signOut();
};

export const createUser = async (user) => {
    if (!user) return;

    const createdAt = new Date();
    const { photoURL, displayName } = user;
    const userRef = firestore.collection("users").doc(user.uid);
    await userRef.set({
        createdAt,
        photoURL,
        displayName,
        notes: [],
    });
};

export const readUser = async (uid) => {
    if (!uid) return;

    const userRef = firestore.collection("users").doc(uid);
    const user = await userRef.get();
    return { uid, ...user.data() };
};

export const updateUser = async (uid, updates) => {
    if (!uid) return;

    const userRef = firestore.collection("users").doc(uid);
    const user = await userRef.update({
        updates,
    });
    return { uid, ...user.data() };
};

export const deleteUser = async (uid) => {
    if (!uid) return;

    const userRef = firestore.collection("users").doc(uid);
    const user = await userRef.delete();
    return { uid, ...user.data() };
};
