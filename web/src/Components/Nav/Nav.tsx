import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import { useSpring, animated } from "react-spring";

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
        </NavContainer>
    );
}

const NavContainer = styled(animated.nav)`
    position: fixed;
    top: 0;
    left: -80%;
    height: 100%;
    width: 80%;
    background-color: black;
`;

const NavToggle = styled.div`
    position: absolute;
    bottom: 50px;
    right: -50px;
    height: 50px;
    width: 50px;
    background-color: black;
    border-radius: 0 50% 50% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        fill: white;
    }
`;
