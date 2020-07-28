import React from "react";
import styled from "styled-components";
import { AiOutlinePlusSquare } from "react-icons/ai";

export default function AddToDo() {
    return (
        <AddToDoContainer>
            <AiOutlinePlusSquare style={{ height: "100%", width: "auto" }} />
            <div style={{ fontWeight: "bold" }}>Add a ToDo</div>
        </AddToDoContainer>
    );
}

const AddToDoContainer = styled.div`
    height: 60px;
    min-width: 200px;
    width: 100%;
    max-width: 400px;
    border: 3px solid ${(props) => props.theme.black};
    display: flex;
    align-items: center;
`;
