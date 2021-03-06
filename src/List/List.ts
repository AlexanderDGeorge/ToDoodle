import { firestore, fieldValue, storageRef } from "../firebase";

export interface List {
    id: string;
    title: string;
    photoURL: string;
    color: string;
    users: Array<string>;
    todos: Array<string>;
}

export const initialList: List = {
    id: "",
    title: "",
    photoURL: "",
    color: "",
    users: [],
    todos: [],
};

interface NewList {
    title: string;
    photoURL?: string;
    color?: string;
    users: Array<string>;
}

export const createList = async (list: NewList) => {
    const listRef = firestore.collection("lists");
    try {
        listRef
            .add({
                ...list,
                todos: [],
            })
            .then((newList) => {
                list.users.forEach(async (user) => {
                    const userRef = firestore.collection("users").doc(user);
                    await userRef.update({
                        lists: fieldValue.arrayUnion(newList.id),
                    });
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

export const deleteList = async (list: List) => {
    if (!list) return;
    const listRef = firestore.collection("lists").doc(list.id);
    try {
        list.users.forEach((user) => {
            const userRef = firestore.collection("users").doc(user);
            userRef.update({
                lists: fieldValue.arrayRemove(list?.id),
            });
        });
        list.todos.forEach((todo) => {
            const todoRef = firestore.collection("todos").doc(todo);
            todoRef.delete();
        });
        await listRef.delete();
        console.log("list delete done.");
    } catch (error) {
        console.error(error.message);
    }
};

export const uploadListPhoto = async (file: File) => {
    return storageRef
        .child(`listImages/${file}`)
        .put(file)
        .then(async (snapshot) => {
            const url = await snapshot.ref.getDownloadURL();
            return url;
        });
};
