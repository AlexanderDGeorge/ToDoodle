import React, { useState, useContext } from "react";
import { useSpring, animated } from "react-spring";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Menu from "../Nav/Menu";
import { InputWithLabel, Label } from "../Components/Form";
import { LargeButton } from "../Components/Buttons";
import { UserContext } from "../App";
import { createList } from "./List";
import ListUserCard, { AddUserCard } from "./ListUserCard";
import ListColorPicker from "./ListColorPicker";
import HorDivWithOr from "../Components/Dividers";
import PhotoUpload from "./PhotoUpload";

export default function NewListMenu(props: { bottomPosition: String }) {
    const currentUser = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [color, setColor] = useState("");
    const [users, setUsers] = useState([currentUser.id]);

    async function handleCreate() {
        await createList({ title, photoURL, color, users });
    }

    function isDisabled() {
        return !!!(title.length && color.length && users.length);
    }

    function handlePhotoUpload() {}

    return (
        <Menu bottomPosition={props.bottomPosition} icon={<AddListIcon />}>
            <h1 style={{ marginBottom: 40 }}>Create a New List</h1>
            <InputWithLabel
                label="Title"
                value={title}
                setValue={setTitle}
                type="text"
            />
            <ListColorPicker
                color={color}
                setColor={setColor}
                setPhotoURL={setPhotoURL}
            />
            <HorDivWithOr />
            <PhotoUpload setPhotoURL={setPhotoURL} />
            <div style={{ margin: "20px 0" }}>
                <Label>Users</Label>
                {users.map((user, i) => (
                    <ListUserCard userId={user} setUsers={setUsers} key={i} />
                ))}
                <AddUserCard />
            </div>
            <LargeButton disabled={isDisabled()} onClick={handleCreate}>
                Create List
            </LargeButton>
        </Menu>
    );
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
