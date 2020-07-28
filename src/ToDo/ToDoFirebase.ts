import { firestore } from "../firebase";

export interface ToDo {
    id: string;
    author: string;
    name: string;
    createdAt: Date;
    deadline?: Date;
    completed: boolean;
    completedBy?: string;
    completedAt?: Date;
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
