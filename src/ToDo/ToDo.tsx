import React from "react";
import styled from "styled-components";

export default function ToDo(props: { toDoId: string }) {
    return <ToDoContainer></ToDoContainer>;
}

const ToDoContainer = styled.div`
    height: 60px;
    min-width: 200px;
    width: 100%;
    max-width: 400px;
    border: 3px solid ${(props) => props.theme.black};
    display: flex;
    align-items: center;
    cursor: pointer;
`;
