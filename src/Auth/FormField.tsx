import React, { useState } from "react";
import styled from "styled-components";
import FormError from "./FormError";
import { InputWithLabel } from "../Components/Form";

interface FormFieldProps {
    label: string;
    style?: React.CSSProperties;
    state: string;
    setState: any;
    type: string;
    required: boolean;
    min?: number;
    max?: number;
}

export default function FormField(props: FormFieldProps) {
    const { label, style, state, setState, type, required, min, max } = props;
    const [error, setError] = useState("");

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

    return (
        <FormFieldWrapper style={style}>
            <InputWithLabel
                label={label}
                value={state}
                setValue={setState}
                type={type}
            />
            <FormError error={error} />
        </FormFieldWrapper>
    );
}

const FormFieldWrapper = styled.div`
    min-width: 200px;
    width: 100%;
    margin-top: 20px;
    background-color: white;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
