import React, { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

interface MenuProps {
    children: ReactNode;
    icon: JSX.Element;
    bottomPosition: String;
}

export default function Menu(props: MenuProps) {
    const [open, setOpen] = useState(false);
    const [menuSpring, setMenuSpring] = useSpring(() => ({
        transform: "translateX(0%)",
    }));

    useEffect(() => {
        const container = document.getElementById("MenuContainer");
        function handleClick(e: any) {
            if (open && e.target !== container) {
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
            setMenuSpring({ transform: "translateX(0%)" });
            setOpen(false);
        } else {
            setMenuSpring({ transform: "translateX(100%)" });
            setOpen(true);
        }
    }

    return (
        <MenuContainer style={menuSpring} id="MenuContainer">
            <MenuTab
                style={{ bottom: `${props.bottomPosition}` }}
                onClick={toggleOpen}
            >
                {props.icon}
            </MenuTab>
            {props.children}
        </MenuContainer>
    );
}

const MenuContainer = styled(animated.nav)`
    position: fixed;
    top: 0;
    left: -80%;
    height: 100%;
    width: 80%;
    background-color: ${(props) => props.theme.light};
    box-sizing: border-box;
    padding: 2%;
`;

const MenuTab = styled.div`
    position: absolute;
    right: -70px;
    height: 70px;
    width: 71px;
    background-color: ${(props) => props.theme.light};
    border-radius: 0 50% 50% 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
