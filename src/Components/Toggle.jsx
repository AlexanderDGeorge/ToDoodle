import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

export function Toggle({ toggle, setToggle, size = 30 }) {
    const [background, setBackground] = useSpring(() => ({
        backgroundColor: "#aaaaaa",
        height: size,
        width: size * 2,
        borderRadius: size,
    }));
    const [button, setButton] = useSpring(() => ({
        left: -3,
        height: size,
        width: size,
    }));

    function handleClick() {
        setToggle(!toggle);
        setBackground({
            backgroundColor: toggle ? "#aaaaaa" : "#69ce5f",
        });
        setButton({ left: toggle ? -3 : size });
    }

    return (
        <ToggleContainer style={background} onClick={handleClick}>
            <animated.div style={button} />
        </ToggleContainer>
    );
}

const ToggleContainer = styled(animated.div)`
    position: relative;
    border: 3px solid ${(props) => props.theme.dark};
    > div {
        position: absolute;
        border: 3px solid ${(props) => props.theme.dark};
        border-radius: 50%;
        bottom: -3px;
        background-color: ${(props) => props.theme.white};
    }
`;
