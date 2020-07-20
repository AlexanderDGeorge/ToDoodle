import React, { useState } from "react";
import styled from "styled-components";
import FormField from "./FormField";
import { SignUpButton, GoogleButton } from "./FormButtons";

interface NewUser {
    first: string;
    last: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUpWrapper = styled.form`
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

export default function SignUp() {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <SignUpWrapper>
            <section>
                <FormField
                    style={{ marginRight: 10, minWidth: 0 }}
                    label="First Name"
                    state={first}
                    setState={setFirst}
                    type="text"
                    required={true}
                    min={4}
                    max={16}
                />
                <FormField
                    style={{ minWidth: 0 }}
                    label="Last Name"
                    state={last}
                    setState={setLast}
                    type="text"
                    required={true}
                    min={4}
                    max={16}
                />
            </section>
            <FormField
                label="Email"
                state={email}
                setState={setEmail}
                type="email"
                required={true}
            />
            <FormField
                label="Password"
                state={password}
                setState={setPassword}
                type="password"
                required={true}
                min={6}
                max={16}
            />
            <FormField
                label="Confirm Password"
                state={confirmPassword}
                setState={setConfirmPassword}
                type="password"
                required={true}
                min={6}
                max={16}
            />
            <SignUpButton />
            <GoogleButton />
        </SignUpWrapper>
    );
}
