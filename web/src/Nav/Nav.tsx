import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import ProfileNavItem from "./ProfileNavItem";

export default function Nav() {
    const [open, setOpen] = useState(false);
    const [navSpring, setNavSpring] = useSpring(() => ({
        transform: "translateX(0%)",
    }));
    const [arrowSpring, setArrowSpring] = useSpring(() => ({
        transform: "rotate(0deg)",
    }));

    function toggleOpen() {
        if (open) {
            setNavSpring({ transform: "translateX(0%)" });
            setArrowSpring({ transform: "rotate(0deg)" });
            setOpen(false);
        } else {
            setNavSpring({ transform: "translateX(100%)" });
            setArrowSpring({ transform: "rotate(180deg)" });
            setOpen(true);
        }
    }

    return (
        <NavContainer style={navSpring}>
            <NavToggle onClick={toggleOpen}>
                <animated.div style={arrowSpring}>
                    <FaArrowRight />
                </animated.div>
            </NavToggle>
            <ProfileNavItem />
            <NavItem name="Dark Mode" toggleOpen={toggleOpen} />
        </NavContainer>
    );
}

function NavItem(props: {
    name: string;
    toggleOpen: Function;
    icon?: JSX.Element;
    path?: string;
}) {
    return <NavItemContainer>{props.name}</NavItemContainer>;
}

const NavContainer = styled(animated.nav)`
    position: fixed;
    top: 0;
    left: -80%;
    height: 100%;
    width: 80%;
    background-color: black;
    box-sizing: border-box;
    padding: 2%;
`;

const NavToggle = styled.div`
    position: absolute;
    bottom: 50px;
    right: -50px;
    height: 50px;
    width: 51px;
    background-color: black;
    border-radius: 0 50% 50% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        fill: white;
    }
`;

const NavItemContainer = styled.div`
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid white;
    color: white;
    display: flex;
    align-items: center;
`;
