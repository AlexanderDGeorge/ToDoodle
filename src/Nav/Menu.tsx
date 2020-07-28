import React, { useState, createContext } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

interface MenuProps {
    children: React.ReactNode;
    icon: JSX.Element;
    bottomPosition: String;
}

export const MenuContext = createContext<Function | null>(null);

export default function Menu(props: MenuProps) {
    const [open, setOpen] = useState(false);
    const [menuSpring, setMenuSpring] = useSpring(() => ({
        transform: "translateX(0%)",
        zIndex: 0,
    }));

    // useEffect(() => {
    //     function handleClick(e: any) {
    //         if (!menuRef.current.contains(e.target)) {
    //             toggleOpen();
    //         }
    //     }
    //     document.addEventListener("click", handleClick);
    //     return () => {
    //         document.removeEventListener("click", handleClick);
    //     };
    // });

    function toggleOpen() {
        if (open) {
            setMenuSpring({
                transform: "translateX(0%)",
                zIndex: 0,
            });
            setOpen(false);
        } else {
            setMenuSpring({
                transform: "translateX(100%)",
                zIndex: 1,
            });
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
            <MenuContext.Provider value={toggleOpen}>
                {props.children}
            </MenuContext.Provider>
        </MenuContainer>
    );
}

const MenuContainer = styled(animated.div)`
    position: fixed;
    top: 0;
    left: -80%;
    height: 100%;
    width: 80%;
    box-sizing: border-box;
    padding: 2%;
    border-right: 3px solid ${(props) => props.theme.black};
    background-color: ${(props) => props.theme.light};
`;

const MenuTab = styled.div`
    position: absolute;
    right: -70px;
    height: 70px;
    width: 70px;
    box-sizing: border-box;
    border-radius: 0 50% 50% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: inherit;
    border-top: 3px solid ${(props) => props.theme.black};
    border-right: 3px solid ${(props) => props.theme.black};
    border-bottom: 3px solid ${(props) => props.theme.black};
`;
