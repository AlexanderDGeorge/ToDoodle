import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";
import { signInWithGoogle, signUp } from "./Auth";
import { ValuesContext } from "./Form";
import Loader from "../Components/Loader";
import { LargeButton } from "../Components/Buttons";

export function SignUpButton() {
    // const { valid } = useContext(FormContext);
    const values = useContext(ValuesContext);
    const [loading, setLoading] = useState(false);

    async function handleSignUp() {
        setLoading(true);
        await signUp(values);
        setLoading(false);
    }

    return (
        <LargeButton
            // style={{ backgroundColor: "#46b01c" }}
            onClick={handleSignUp}
        >
            {loading ? <Loader /> : "Sign Up"}
        </LargeButton>
    );
}

export function LogInButton() {
    return <FormButtonWrapper>Log In</FormButtonWrapper>;
}

export function GoogleButton() {
    return (
        <LargeButton onClick={signInWithGoogle}>
            <FaGoogle />
            Continue with Google
        </LargeButton>
    );
}

const FormButtonWrapper = styled.button`
    height: 40px;
    width: 200px;
    margin-top: 40px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    overflow: hidden;
    &:hover {
        box-shadow: 0 0 3px 1px;
    }
`;
