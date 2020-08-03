import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import {
    AiOutlineCheckCircle,
    AiOutlineCloseSquare,
    AiOutlineMore,
} from "react-icons/ai";
import { firestore } from "../firebase";
import { Todo, updateTodo } from "./Todo";
import { UserContext } from "../App";
import Modal from "../Components/Modal";
import EditTodoModal from "./EditTodo";

export default function TodoItem(props: { todoId: string }) {
    const currentUser = useContext(UserContext);
    const [todo, setTodo] = useState<Todo | undefined>(undefined);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = firestore
            .collection("todos")
            .doc(props.todoId)
            .onSnapshot((snapshot) => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    if (data) {
                        setTodo({
                            id: snapshot.id,
                            author: data.author,
                            name: data.name,
                            deadline: data.deadline,
                            reminder: data.reminder,
                            createdAt: data.createdAt,
                            completed: data.completed,
                            completedBy: data.completedBy,
                            completedAt: data.completedAt,
                        });
                    }
                }
            });
        return () => {
            unsubscribe();
        };
    }, [props.todoId]);

    if (todo) {
        return (
            <TodoContainer>
                {todo.completed ? (
                    <AiOutlineCheckCircle
                        onClick={() =>
                            updateTodo({
                                ...todo,
                                completed: false,
                                completedBy: "",
                                completedAt: "",
                            })
                        }
                    />
                ) : (
                    <AiOutlineCloseSquare
                        onClick={() =>
                            updateTodo({
                                ...todo,
                                completed: true,
                                completedBy: currentUser.firstName,
                                completedAt: new Date().toString(),
                            })
                        }
                    />
                )}
                <p style={{ fontWeight: "bold" }}>{todo.name}</p>
                <AiOutlineMore onClick={() => setModalOpen(true)} />
                {modalOpen ? (
                    <Modal setOpen={setModalOpen}>
                        <EditTodoModal setModalOpen={setModalOpen} />
                    </Modal>
                ) : null}
            </TodoContainer>
        );
    } else return null;
}

const TodoContainer = styled.div`
    height: 60px;
    min-width: 200px;
    width: 100%;
    max-width: 400px;
    margin: 10px 0;
    border: 3px solid ${(props) => props.theme.black};
    display: flex;
    align-items: center;
    cursor: pointer;
    > p {
        width: 100%;
        font-weight: bold;
    }
    > svg {
        height: 100%;
        min-width: 54px;
        width: auto;
    }
`;
