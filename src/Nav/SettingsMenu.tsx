import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import Menu from "./Menu";
import { AiOutlineSetting } from "react-icons/ai";
import { ThemeContext } from "../App";
import { Toggle } from "../Components/Toggle";
import { LargeButton } from "../Components/Buttons";
import { auth } from "../firebase";

export default function SettingsMenu(props: { bottomPosition: String }) {
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    return (
        <Menu bottomPosition={props.bottomPosition} icon={<SettingsMenuIcon />}>
            <h1>Settings</h1>
            <MenuItem>
                <h4>Dark Mode</h4>
                <Toggle toggle={darkMode} setToggle={setDarkMode} />
            </MenuItem>
            <LargeButton
                onClick={() => {
                    auth.signOut();
                }}
            >
                Logout
            </LargeButton>
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

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
