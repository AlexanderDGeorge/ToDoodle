import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

interface InputProps {
    label: string;
    style?: React.CSSProperties;
    value: string | number;
    setValue: Function;
    type: string;
    onBlur?: Function;
}

export function InputWithLabel(props: InputProps) {
    const { label, style, value, setValue, type, onBlur } = props;
    const initialState = {
        color: "#999",
        transform: "translateY(0px)",
        fontWeight: 500,
    };
    const sprungState = {
        color: "black",
        transform: "translateY(-30px)",
        fontWeight: 600,
    };
    const [spring, setSpring] = useSpring(() =>
        value ? sprungState : initialState
    );

    function handleBlur() {
        if (value) return;
        setSpring(initialState);
        if (onBlur) onBlur();
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
                onFocus={() => setSpring(sprungState)}
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

interface DateSelectProps {
    label: string;
    value: string | undefined;
    setValue: Function;
    type: string;
}

export function DateTimeSelect(props: DateSelectProps) {
    return (
        <DateSelectContainer>
            <Label>{props.label}</Label>
            <input
                type={props.type}
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </DateSelectContainer>
    );
}

const DateSelectContainer = styled.div`
    margin: 20px 0;
    > input {
        height: 44px;
        min-width: 200px;
        width: 100%;
        max-width: 400px;
        border: 3px solid ${(props) => props.theme.black};
        padding: 5px;
        font-size: 20px;
        background-color: ${(props) => props.theme.white};
    }
`;

export function DaySelect(props: { days: Array<string>; setDays: Function }) {
    const days = ["S", "M", "T", "W", "T", "F", "S"];

    function Day(props: {
        days: Array<string>;
        letter: string;
        onClick: Function;
        i: number;
    }) {
        return (
            <DayContainer
                onClick={() => props.onClick()}
                style={
                    props.days[props.i] === "X"
                        ? { backgroundColor: "gray" }
                        : { backgroundColor: "#0073bb" }
                }
            >
                <p>{props.letter}</p>
            </DayContainer>
        );
    }

    function toggleDay(i: number) {
        let newSet = props.days;
        const newDay = props.days[i] === "X" ? days[i] : "X";
        newSet[i] = newDay;
        console.log(newSet);
        return props.setDays(newSet);
    }

    return (
        <DaySelectContainer>
            {days.map((letter, i) => (
                <Day
                    days={props.days}
                    letter={letter}
                    i={i}
                    key={i}
                    onClick={() => toggleDay(i)}
                />
            ))}
        </DaySelectContainer>
    );
}

const DaySelectContainer = styled.div`
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const DayContainer = styled.div`
    height: 40px;
    width: 40px;
    border: 3px solid ${(props) => props.theme.black};
    color: 3px solid ${(props) => props.theme.white};
    display: flex;
    align-items: center;
    justify-content: center;
`;
