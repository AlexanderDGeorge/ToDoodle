import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import {
    AiOutlineCheckCircle,
    AiOutlineCloseSquare,
    AiOutlineMore,
} from "react-icons/ai";
import { firestore } from "../firebase";
import { ToDo, updateToDo } from "./ToDo";
import { UserContext } from "../App";

export default function ToDoItem(props: { toDoId: string }) {
    const currentUser = useContext(UserContext);
    const [toDo, setToDo] = useState<ToDo | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = firestore
            .collection("toDos")
            .doc(props.toDoId)
            .onSnapshot((snapshot) => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    if (data) {
                        setToDo({
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
    }, [props.toDoId]);

    if (toDo) {
        return (
            <ToDoContainer>
                {toDo.completed ? (
                    <AiOutlineCheckCircle
                        onClick={() =>
                            updateToDo({
                                ...toDo,
                                completed: false,
                                completedBy: "",
                                completedAt: "",
                            })
                        }
                    />
                ) : (
                    <AiOutlineCloseSquare
                        onClick={() =>
                            updateToDo({
                                ...toDo,
                                completed: true,
                                completedBy: currentUser.firstName,
                                completedAt: new Date().toString(),
                            })
                        }
                    />
                )}
                <p style={{ fontWeight: "bold" }}>{toDo.name}</p>
                <AiOutlineMore />
            </ToDoContainer>
        );
    } else return null;
}

const ToDoContainer = styled.div`
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
