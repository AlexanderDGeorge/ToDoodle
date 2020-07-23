import { firestore, fieldValue } from "../firebase";

export interface ToDoList {
    id?: string;
    photoURL?: string;
    title: string;
    users: Array<string>;
    toDos?: Array<string>;
}

export interface ToDo {
    id: string;
    name: string;
    done: boolean;
    createdAt: Date;
    deadline: Date;
    completedBy: string;
}

export const createToDoList = async (toDoList: ToDoList) => {
    const listRef = firestore.collection("lists");
    try {
        listRef.add({
            ...toDoList,
        });
        toDoList.users.forEach(async (user) => {
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

export const fetchToDoList = async (listId: string) => {
    const listRef = firestore.collection("lists").doc(listId);
    try {
        const list = await listRef.get();
        console.log("list read done.");
        return { id: listId, ...list.data() };
    } catch (error) {
        console.error(error.message);
    }
};

export const updateToDoList = async (todoList: ToDoList) => {
    const listRef = firestore.collection("lists").doc(todoList.id);
    try {
        await listRef.update(todoList);
        console.log("list update done.");
    } catch (error) {
        console.error(error.message);
    }
};

export const deleteToDoList = async (listId: string) => {
    const listRef = firestore.collection("lists").doc(listId);
    try {
        await listRef.delete();
        console.log("list delete done.");
    } catch (error) {
        console.error(error.message);
    }
};
