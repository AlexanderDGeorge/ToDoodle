import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Menu from "./Menu";
import { AiOutlineSetting } from "react-icons/ai";

export default function SettingsMenu(props: { bottomPosition: String }) {
    return (
        <Menu bottomPosition={props.bottomPosition} icon={<SettingsMenuIcon />}>
            Settings
        </Menu>
    );
}

function SettingsMenuIcon() {
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
            <AiOutlineSetting style={{ height: 40, width: "auto" }} />
        </animated.div>
    );
}
