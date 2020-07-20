import React from "react";
import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";
import { signInWithGoogle } from "./Auth";

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
    &:hover {
        box-shadow: 0 0 3px 1px;
    }
`;

export function SignUpButton() {
    function handleSignUp() {}

    return (
        <FormButtonWrapper
            style={{ backgroundColor: "#46b01c" }}
            type="submit"
            onClick={handleSignUp}
        >
            Sign Up
        </FormButtonWrapper>
    );
}

export function LogInButton() {
    return <FormButtonWrapper>Log In</FormButtonWrapper>;
}

export function GoogleButton() {
    return (
        <FormButtonWrapper onClick={signInWithGoogle}>
            <FaGoogle />
            Continue with Google
        </FormButtonWrapper>
    );
}
