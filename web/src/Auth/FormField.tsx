import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import FormError from "./FormError";

interface FormFieldProps {
    label: string;
    state: string;
    setState: any;
    type: string;
    required: boolean;
    min?: number;
    max?: number;
}

const FormFieldWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 40px 20px;
    > * {
        font-size: 16px;
    }
    > label {
        position: absolute;
        z-index: -1;
        padding: 10px 10px 10px 12px;
    }
    > input {
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
    const { label, state, setState, type, required, min, max } = props;
    const initialState = {
        color: "#999",
        transform: "translateY(0px)",
    };
    const [error, setError] = useState("");
    const [spring, setSpring] = useSpring(() => initialState);

    function errorCheck() {
        if (required && !state) {
            setError("Required");
        } else if (min && state.length < min) {
            setError("That's too short");
        } else if (max && state.length > max) {
            setError("That's too long");
        } else {
            setError("");
        }
    }

    function handleFocus() {
        setSpring({
            color: "black",
            transform: "translateY(-40px)",
        });
    }

    function handleBlur() {
        errorCheck();
        if (state) return;
        setSpring(initialState);
    }

    return (
        <FormFieldWrapper>
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
            <FormError error={error} label={label} />
        </FormFieldWrapper>
    );
}
