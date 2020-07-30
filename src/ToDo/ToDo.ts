import { firestore, fieldValue } from "../firebase";

export interface ToDo {
    id: string;
    author: string;
    name: string;
    deadline: string;
    reminder: string;
    createdAt: string;
    completed: boolean;
    completedBy: string;
    completedAt: string;
}

export const createToDo = async (
    listId: string,
    newToDo: {
        author: string;
        name: string;
        deadline: string;
        reminder: string;
    }
) => {
    const toDoRef = firestore.collection("toDos");
    try {
        return toDoRef
            .add({
                ...newToDo,
                createdAt: new Date(),
                completed: false,
                completedBy: "",
                completedAt: "",
            })
            .then((toDo) => {
                addListToDo(listId, toDo.id);
            });
    } catch (error) {
        console.error(error.message);
    }
};

const addListToDo = async (listId: string, toDoId: string) => {
    const listRef = firestore.collection("lists").doc(listId);
    try {
        listRef.update({
            toDos: fieldValue.arrayUnion(toDoId),
        });
    } catch (error) {
        console.error(error.message);
    }
};

export const updateToDo = async (toDo: ToDo) => {
    const toDoRef = firestore.collection("toDos").doc(toDo.id);
    try {
        toDoRef.update(toDo);
    } catch (error) {
        console.error(error.message);
    }
};
