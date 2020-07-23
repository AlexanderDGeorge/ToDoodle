import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Menu from "../Nav/Menu";
import { InputWithLabel, Label } from "../Components/Form";
import { LargeButton } from "../Components/Buttons";

export default function ListMenu(props: { bottomPosition: String }) {
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("");

    function handleCreate() {}

    return (
        <Menu bottomPosition={props.bottomPosition} icon={<AddListIcon />}>
            <h1 style={{ marginBottom: 40 }}>Create a New List</h1>
            <InputWithLabel
                label="Title"
                value={title}
                setValue={setTitle}
                type="text"
            />
            <div style={{ margin: "20px 0" }}>
                <Label>Colors</Label>
                <ColorsContainer>
                    <ColorItem hex="#c81927" />
                    <ColorItem hex="#1885f2" />
                    <ColorItem hex="#ed8607" />
                    <ColorItem hex="#514ebc" />
                    <ColorItem hex="#00a344" />
                </ColorsContainer>
            </div>
            <LargeButton onClick={handleCreate}>Create List</LargeButton>
        </Menu>
    );
}

function ColorItem(props: { hex: string }) {
    return <ColorItemContainer style={{ backgroundColor: props.hex }} />;
}

function AddListIcon() {
    const [rotate, setRotate] = useState(false);
    const [spring, setSpring] = useSpring(() => ({
        transform: "rotate(0deg)",
    }));

    function handleClick() {
        if (rotate) {
            setRotate(false);
            setSpring({ transform: "rotate(0deg)" });
        } else {
            setRotate(true);
            setSpring({ transform: "rotate(360deg)" });
        }
    }
    return (
        <animated.div style={spring} onClick={handleClick}>
            <AiOutlinePlusCircle style={{ height: 40, width: "auto" }} />
        </animated.div>
    );
}

const ColorsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const ColorItemContainer = styled.div`
    height: 40px;
    width: 40px;
    margin: 10px;
    border: 3px solid ${(props) => props.theme.black};
    border-radius: 50%;
`;
