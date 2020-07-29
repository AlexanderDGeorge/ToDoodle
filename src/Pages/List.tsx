import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ListContext } from "../App";
import { firestore } from "../firebase";
import { Redirect } from "react-router-dom";
import ToDo from "../ToDo/ToDo";
import AddToDo from "../ToDo/AddToDo";

export default function List() {
    const { currentList } = useContext(ListContext);
    const [toDos, setToDos] = useState([]);

    useEffect(() => {
        let unsubscribe: Function = () => {};
        if (currentList.id?.length) {
            unsubscribe = firestore
                .collection("lists")
                .doc(currentList.id)
                .onSnapshot((snapshot) => {
                    if (snapshot.exists) {
                        const data = snapshot.data();
                        if (data) {
                            setToDos([]);
                        }
                    }
                });
        }
        return () => {
            unsubscribe();
        };
    }, [currentList]);

    if (currentList.id?.length) {
        return (
            <ListContainer>
                <h1>{currentList.title}</h1>
                {toDos.map((toDo) => (
                    <ToDo toDoId={toDo} />
                ))}
                <AddToDo />
            </ListContainer>
        );
    } else {
        return <Redirect to="/" />;
    }
}

const ListContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 2%;
`;
