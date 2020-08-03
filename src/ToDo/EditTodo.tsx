import React from "react";
import styled from "styled-components";

interface EditTodoModalProps {
    setModalOpen: Function;
}

export default function EditTodoModal(props: EditTodoModalProps) {
    return (
        <EditTodoModalContainer>
            <h2 style={{ marginBottom: 30 }}>Edit a Todo</h2>
        </EditTodoModalContainer>
    );
}

const EditTodoModalContainer = styled.div`
    width: 300px;
    padding: 10px;
    background-color: ${(props) => props.theme.white};
`;
