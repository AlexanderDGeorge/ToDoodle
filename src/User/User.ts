import { firestore } from "../firebase";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    photoURL: string;
    email: string;
    toDos: Array<string>;
}

export const InitialUser = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    photoURL: "",
    toDos: [],
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
                  toDos: user.toDos,
              }
            : undefined;
    } catch (error) {
        console.error(error.message);
    }
}
