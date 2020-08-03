import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AiOutlineCheckCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { Todo, updateTodo, deleteTodo } from "./Todo";
import { InputWithLabel, DateTimeSelect, DaySelect } from "../Components/Form";
import { SmallButton } from "../Components/Buttons";
import { ListContext } from "../App";

interface EditTodoModalProps {
    setModalOpen: Function;
    todo: Todo;
}

export default function EditTodoModal(props: EditTodoModalProps) {
    const { currentList } = useContext(ListContext);
    const [name, setName] = useState(props.todo.name);
    const [date, setDate] = useState(props.todo.deadline || "");
    const [time, setTime] = useState(props.todo.reminder || "");
    const [days, setDays] = useState(["X", "X", "X", "X", "X", "X", "X"]);

    function handleUpdate() {
        props.setModalOpen(false);
        updateTodo({ ...props.todo, name, deadline: date, reminder: time });
    }

    function handleDelete() {
        props.setModalOpen(false);
        deleteTodo(currentList.id, props.todo.id);
    }

    return (
        <EditTodoModalContainer>
            <h2 style={{ marginBottom: 30 }}>Edit a Todo</h2>
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
            <ButtonContainer>
                <SmallButton
                    onClick={handleUpdate}
                    color="#4CB944"
                    disabled={!!!name}
                >
                    <AiOutlineCheckCircle
                        style={{ height: 40, width: "auto", fill: "white" }}
                    />
                </SmallButton>
                <SmallButton onClick={handleDelete} color="#C81927">
                    <AiOutlineCloseSquare
                        style={{ height: 40, width: "auto", fill: "white" }}
                    />
                </SmallButton>
            </ButtonContainer>
        </EditTodoModalContainer>
    );
}

const EditTodoModalContainer = styled.div`
    width: 300px;
    padding: 10px;
    background-color: ${(props) => props.theme.white};
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
