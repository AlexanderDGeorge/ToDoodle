import React, { useState } from "react";
import styled from "styled-components";
import FormField from "./FormField";

interface NewUser {
    first: string;
    last: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUpWrapper = styled.form`
    > div {
        display: flex;
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
            <div>
                <FormField
                    label="First Name"
                    state={first}
                    setState={setFirst}
                    type="text"
                    required={true}
                    min={4}
                    max={16}
                />
                <FormField
                    label="Last Name"
                    state={last}
                    setState={setLast}
                    type="text"
                    required={true}
                    min={4}
                    max={16}
                />
            </div>
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
        </SignUpWrapper>
    );
}
