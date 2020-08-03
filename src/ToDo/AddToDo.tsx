import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Modal from "../Components/Modal";
import { InputWithLabel, DateTimeSelect, DaySelect } from "../Components/Form";
import { SmallButton } from "../Components/Buttons";
import { createTodo } from "./Todo";
import { UserContext, ListContext } from "../App";

export default function AddTodo() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <AddToDoContainer onClick={() => setModalOpen(true)}>
                <AiOutlinePlusSquare
                    style={{ height: "100%", width: "auto" }}
                />
                <div style={{ fontWeight: "bold" }}>Add a Todo</div>
            </AddToDoContainer>
            {modalOpen ? (
                <Modal setOpen={setModalOpen}>
                    <AddToDoModal setModalOpen={setModalOpen} />
                </Modal>
            ) : null}
        </>
    );
}

interface AddToDoModalProps {
    setModalOpen: Function;
    name?: string;
    date?: string;
}

export function AddToDoModal(props: AddToDoModalProps) {
    const currentUser = useContext(UserContext);
    const { currentList } = useContext(ListContext);
    const [name, setName] = useState(props.name || "");
    const [date, setDate] = useState<string>(props.date || "");
    const [time, setTime] = useState<string>("");
    const [days, setDays] = useState(["X", "X", "X", "X", "X", "X", "X"]);

    function handleCreate() {
        createTodo(currentList.id, {
            author: currentUser.firstName,
            name,
            deadline: date,
            reminder: time,
        });
        props.setModalOpen(false);
    }

    return (
        <AddToDoModalContainer>
            <h2 style={{ marginBottom: 30 }}>Create a Todo</h2>
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
    margin: 10px 0;
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
