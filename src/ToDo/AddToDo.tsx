import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Modal from "../Components/Modal";
import { InputWithLabel } from "../Components/Form";

export default function AddToDo() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <AddToDoContainer onClick={() => setModalOpen(true)}>
            <AiOutlinePlusSquare style={{ height: "100%", width: "auto" }} />
            <div style={{ fontWeight: "bold" }}>Add a ToDo</div>
            {modalOpen ? (
                <Modal setOpen={setModalOpen}>
                    <AddToDoModal />
                </Modal>
            ) : null}
        </AddToDoContainer>
    );
}

function AddToDoModal() {
    const [name, setName] = useState("");

    return (
        <AddToDoModalContainer>
            <h2 style={{ marginBottom: 30 }}>Create a ToDo</h2>
            <InputWithLabel
                label="Name"
                value={name}
                setValue={setName}
                type="text"
            />
        </AddToDoModalContainer>
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
    cursor: pointer;
`;

const AddToDoModalContainer = styled.div`
    height: 400px;
    width: 300px;
    padding: 10px;
    background-color: ${(props) => props.theme.white};
`;
