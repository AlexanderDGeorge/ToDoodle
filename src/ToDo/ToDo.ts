import { firestore, fieldValue } from "../firebase";

export interface Todo {
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

export const createTodo = async (
    listId: string,
    newTodo: {
        author: string;
        name: string;
        deadline: string;
        reminder: string;
    }
) => {
    const todoRef = firestore.collection("todos");
    try {
        return todoRef
            .add({
                ...newTodo,
                createdAt: new Date(),
                completed: false,
                completedBy: "",
                completedAt: "",
            })
            .then((todo) => {
                addListTodo(listId, todo.id);
            });
    } catch (error) {
        console.error(error.message);
    }
};

const addListTodo = async (listId: string, todoId: string) => {
    const listRef = firestore.collection("lists").doc(listId);
    try {
        listRef.update({
            todos: fieldValue.arrayUnion(todoId),
        });
    } catch (error) {
        console.error(error.message);
    }
};

export const updateTodo = async (todo: Todo) => {
    const todoRef = firestore.collection("todos").doc(todo.id);
    try {
        await todoRef.update(todo);
    } catch (error) {
        console.error(error.message);
    }
};

export const deleteTodo = async (listId: string, todoId: string) => {
    const todoRef = firestore.collection("todos").doc(todoId);
    const listRef = firestore.collection("lists").doc(listId);
    try {
        listRef.update({
            todos: fieldValue.arrayRemove(todoId),
        });
        todoRef.delete();
    } catch (error) {
        console.error(error.message);
    }
};
