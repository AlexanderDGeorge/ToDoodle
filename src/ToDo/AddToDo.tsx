import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Modal from "../Components/Modal";
import { InputWithLabel, DateTimeSelect, DaySelect } from "../Components/Form";
import { SmallButton } from "../Components/Buttons";

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
    const [date, setDate] = useState<string | undefined>(undefined);
    const [time, setTime] = useState<string | undefined>(undefined);
    const [days, setDays] = useState(["X", "X", "X", "X", "X", "X", "X"]);

    console.log(days);

    function handleCreate() {
        console.log("in create");
    }

    return (
        <AddToDoModalContainer>
            <h2 style={{ marginBottom: 30 }}>Create a ToDo</h2>
            <InputWithLabel
                label="Name"
                value={name}
                setValue={setName}
                type="text"
            />
            <DateTimeSelect
                label="Select a Deadline"
                value={date}
                setValue={setDate}
                type="date"
            />
            <DateTimeSelect
                label="Set a Reminder"
                value={time}
                setValue={setTime}
                type="time"
            />
            <DaySelect days={days} setDays={setDays} />
            <SmallButton
                onClick={handleCreate}
                color="#4cb944"
                disabled={!!!name}
            >
                <AiOutlinePlusSquare
                    style={{ height: 40, width: "auto", fill: "white" }}
                />
            </SmallButton>
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
    width: 300px;
    padding: 10px;
    background-color: ${(props) => props.theme.white};
`;
