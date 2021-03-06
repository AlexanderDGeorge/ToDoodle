import { firestore } from "../firebase";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    photoURL: string;
    email: string;
    lists: Array<string>;
}

export const initialUser = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    photoURL: "",
    lists: [],
};

export async function fetchUser(uid: string) {
    const userRef = firestore.collection("users").doc(uid);
    try {
        const user = (await userRef.get()).data();
        return user
            ? {
                  id: uid,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  photoURL: user.photoURL,
                  lists: user.lists,
              }
            : undefined;
    } catch (error) {
        console.error(error.message);
    }
}
