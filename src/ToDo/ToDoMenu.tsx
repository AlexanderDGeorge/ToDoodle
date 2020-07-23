import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Menu from "../Nav/Menu";

export default function ToDoMenu(props: { bottomPosition: String }) {
    return (
        <Menu bottomPosition={props.bottomPosition} icon={<AddMenuIcon />}>
            <h1>Add</h1>
        </Menu>
    );
}

function AddMenuIcon() {
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
