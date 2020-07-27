import { firestore, fieldValue } from "../firebase";

export interface List {
    id?: string;
    title: string;
    photoURL?: string;
    color: string;
    users: Array<string>;
    toDos?: Array<string>;
}

export const createList = async (list: List) => {
    const listRef = firestore.collection("lists");
    try {
        listRef.add({
            ...list,
        });
        list.users.forEach(async (user) => {
            const userRef = firestore.collection("users").doc(user);
            await userRef.update({
                toDos: fieldValue.arrayUnion(listRef.id),
            });
        });
        console.log("list created.");
    } catch (error) {
        console.error(error.message);
    }
};

export const fetchList = async (listId: string) => {
    const listRef = firestore.collection("lists").doc(listId);
    try {
        const list = await listRef.get();
        console.log("list read done.");
        return { id: listId, ...list.data() };
    } catch (error) {
        console.error(error.message);
    }
};

export const updateList = async (list: List) => {
    const listRef = firestore.collection("lists").doc(list.id);
    try {
        await listRef.update(list);
        console.log("list update done.");
    } catch (error) {
        console.error(error.message);
    }
};

export const deleteList = async (listId: string) => {
    const listRef = firestore.collection("lists").doc(listId);
    try {
        await listRef.delete();
        console.log("list delete done.");
    } catch (error) {
        console.error(error.message);
    }
};
