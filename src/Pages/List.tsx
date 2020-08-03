import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ListContext } from "../App";
import { firestore } from "../firebase";
import { Redirect } from "react-router-dom";
import TodoItem from "../Todo/TodoItem";
import AddTodo from "../Todo/AddTodo";

export default function List() {
    const { currentList } = useContext(ListContext);
    const [todos, setTodos] = useState<Array<string>>([]);

    useEffect(() => {
        let unsubscribe: Function = () => {};
        if (currentList.id.length) {
            unsubscribe = firestore
                .collection("lists")
                .doc(currentList.id)
                .onSnapshot((snapshot) => {
                    if (snapshot.exists) {
                        const data = snapshot.data();
                        if (data) {
                            console.log(data);
                            setTodos(data.todos);
                        }
                    }
                });
        }
        return () => {
            unsubscribe();
        };
    }, [currentList]);

    if (currentList.id.length) {
        return (
            <ListContainer>
                <h1>{currentList.title}</h1>
                <TodosContainer>
                    {todos.map((todoId: string, i: number) => (
                        <TodoItem todoId={todoId} key={i} />
                    ))}
                    <AddTodo />
                </TodosContainer>
            </ListContainer>
        );
    } else {
        return <Redirect to="/" />;
    }
}

const ListContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    width: 100%;
    padding: 2%;
`;

const TodosContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;
