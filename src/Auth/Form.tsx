import React, { useState, createContext } from "react";
import styled from "styled-components";
import { UserData } from "./Auth";

interface FormProps {
    children?: any;
    formInfo: UserData;
}

interface IFormContext {
    errors: Object;
    setErrors: Function;
    valid: boolean;
    setValid: Function;
}

export const FormContext = createContext<IFormContext>({
    errors: {},
    setErrors: () => {},
    valid: false,
    setValid: () => {},
});
export const ValuesContext = createContext<UserData>({
    email: "",
    password: "",
});

export default function Form(props: FormProps) {
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(false);

    return (
        <FormContext.Provider value={{ errors, setErrors, valid, setValid }}>
            <ValuesContext.Provider value={props.formInfo}>
                <FormWrapper>{props.children}</FormWrapper>;
            </ValuesContext.Provider>
        </FormContext.Provider>
    );
}

const FormWrapper = styled.div`
    width: 75%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    > section {
        display: flex;
        width: 100%;
    }
`;
