import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import ProfileNavItem from "./ProfileNavItem";
import NavItem from "./NavItem";
import { Toggle } from "../Components/Toggle";
import { ThemeContext } from "../App";

export default function Nav() {
    const [open, setOpen] = useState(false);
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const [navSpring, setNavSpring] = useSpring(() => ({
        transform: "translateX(0%)",
    }));
    const [arrowSpring, setArrowSpring] = useSpring(() => ({
        transform: "rotate(0deg)",
    }));

    useEffect(() => {
        const container = document.getElementById("NavContainer");
        function handleClick(e: any) {
            if (open && e.target !== container) {
                console.log("here");
                toggleOpen();
            }
        }
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [open]);

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
        <NavContainer style={navSpring} id="NavContainer">
            <NavToggle onClick={toggleOpen}>
                <animated.div style={arrowSpring}>
                    <FaArrowRight />
                </animated.div>
            </NavToggle>
            <ProfileNavItem />
            <NavItem
                name="Dark Mode"
                icon={<Toggle toggle={darkMode} setToggle={setDarkMode} />}
                toggleOpen={toggleOpen}
            />
        </NavContainer>
    );
}

const NavContainer = styled(animated.nav)`
    position: fixed;
    top: 0;
    left: -80%;
    height: 100%;
    width: 80%;
    background-color: ${(props) => props.theme.light};
    box-sizing: border-box;
    padding: 2%;
`;

const NavToggle = styled.div`
    position: absolute;
    bottom: 50px;
    right: -50px;
    height: 50px;
    width: 51px;
    background-color: ${(props) => props.theme.light};
    border-radius: 0 50% 50% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        fill: ${(props) => props.theme.black};
    }
`;
