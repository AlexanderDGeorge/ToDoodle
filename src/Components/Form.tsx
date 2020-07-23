import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

interface InputProps {
    label: string;
    style?: React.CSSProperties;
    value: string | number;
    setValue: Function;
    type: string;
}

export function InputWithLabel(props: InputProps) {
    const { label, style, value, setValue, type } = props;
    const initialState = {
        color: "#999",
        transform: "translateY(0px)",
        fontWeight: 500,
    };
    const [spring, setSpring] = useSpring(() => initialState);

    function handleFocus() {
        setSpring({
            color: "black",
            transform: "translateY(-30px)",
            fontWeight: 600,
        });
    }

    function handleBlur() {
        if (value) return;
        setSpring(initialState);
    }

    return (
        <InputContainer style={style}>
            <animated.label style={spring} htmlFor={label}>
                {label}
            </animated.label>
            <input
                type={type}
                name={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </InputContainer>
    );
}

const InputContainer = styled.div`
    min-width: 200px;
    width: 100%;
    max-width: 400px;
    margin: 20px 0;
    background-color: ${(props) => props.theme.white};
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > * {
        font-size: 16px;
    }
    > label {
        position: absolute;
        padding: 10px;
    }
    > input {
        width: 100%;
        z-index: 1;
        box-sizing: border-box;
        outline: none;
        padding: 10px;
        background-color: transparent;
        border: 3px solid ${(props) => props.theme.black};
        &:focus {
            border: 3px solid ${(props) => props.theme.blue};
        }
    }
`;

export function Label(props: { children: string }) {
    return <LabelContainer>{props.children}</LabelContainer>;
}

const LabelContainer = styled.label`
    padding: 10px;
    font-weight: bold;
`;
