import React, { useState } from "react";
import Form from "./Form";
import FormField from "./FormField";
import { SignUpButton, GoogleButton } from "./FormButtons";

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <Form
            formInfo={{ firstName, lastName, email, password, confirmPassword }}
        >
            <FormField
                label="First Name"
                state={firstName}
                setState={setFirstName}
                type="text"
                required={true}
                min={4}
                max={16}
            />
            <FormField
                label="Last Name"
                state={lastName}
                setState={setLastName}
                type="text"
                required={true}
                min={4}
                max={16}
            />
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
        </Form>
    );
}
