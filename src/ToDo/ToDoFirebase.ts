import { firestore } from "../firebase";

export interface ToDo {
    id: string;
    author: string;
    name: string;
    createdAt: string;
    deadline?: string;
    reminder?: string;
    completed: boolean;
    completedBy?: string;
    completedAt?: string;
}

export const createToDo = async (newToDo: {
    author: string;
    name: string;
    deadline?: Date;
}) => {
    const toDoRef = firestore.collection("toDos");
    try {
        toDoRef
            .add({
                ...newToDo,
                createdAt: new Date(),
                completed: false,
            })
            .then((toDo) => {
                return toDo.id;
            });
    } catch (error) {
        console.error(error.message);
    }
};
