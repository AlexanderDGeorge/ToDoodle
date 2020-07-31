import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import Menu from "../Nav/Menu";
import { AiOutlineSetting } from "react-icons/ai";
import { ThemeContext, UserContext } from "../App";
import { Toggle } from "../Components/Toggle";
import { LargeButton } from "../Components/Buttons";
import { auth } from "../firebase";
import { UserCard } from "../User/UserComponents";

export default function SettingsMenu(props: { bottomPosition: string }) {
    return (
        <Menu bottomPosition={props.bottomPosition} icon={<SettingsMenuIcon />}>
            <SettingsForm />
        </Menu>
    );
}

function SettingsForm(props: { toggleOpen?: Function }) {
    const currentUser = useContext(UserContext);
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    return (
        <SettingsMenuContainer>
            <h1>Settings</h1>
            <UserCard user={currentUser} />
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
        </SettingsMenuContainer>
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

const SettingsMenuContainer = styled.div``;

const MenuItem = styled.div`
    min-width: 200px;
    width: 100%;
    max-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
