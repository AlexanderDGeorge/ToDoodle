import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import FormError from "./FormError";

interface FormFieldProps {
    label: string;
    style?: any;
    state: string;
    setState: any;
    type: string;
    required: boolean;
    min?: number;
    max?: number;
}

const FormFieldWrapper = styled.div`
    min-width: 200px;
    width: 100%;
    margin-top: 40px;
    background-color: white;
    border-radius: 10px;
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
        border-radius: 10px;
        padding: 10px;
        background-color: transparent;
        border: 1px solid black;
        &:focus {
            border: 1px solid #0000ee;
        }
    }
`;

export default function FormField(props: FormFieldProps) {
    const { label, style, state, setState, type, required, min, max } = props;
    const initialState = {
        color: "#999",
        transform: "translateY(0px)",
        fontWeight: 500,
    };
    const [error, setError] = useState("");
    const [spring, setSpring] = useSpring(() => initialState);

    function validateEmail(email: string) {
        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function errorCheck() {
        if (required && !state) {
            setError("Required");
        } else if (min && state.length < min) {
            setError("That's too short");
        } else if (max && state.length > max) {
            setError("That's too long");
        } else if (type === "email" && !validateEmail(state)) {
            setError("Invalid email");
        } else {
            setError("");
        }
    }

    function handleFocus() {
        setSpring({
            color: "black",
            transform: "translateY(-30px)",
            fontWeight: 600,
        });
    }

    function handleBlur() {
        errorCheck();
        if (state) return;
        setSpring(initialState);
    }

    return (
        <FormFieldWrapper style={style}>
            <animated.label style={spring} htmlFor={label}>
                {label}
            </animated.label>
            <input
                type={type}
                name={label}
                value={state}
                onChange={(e) => setState(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={error ? { border: "1px solid #cc0000" } : {}}
            />
            <FormError error={error} />
        </FormFieldWrapper>
    );
}
