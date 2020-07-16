import React, { useState } from "react";
import FormField from "./FormField";

interface NewUser {
    first: string;
    last: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignUp() {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    return (
        <form>
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
            <FormField
                label="Email"
                state={email}
                setState={setEmail}
                type="email"
                required={true}
                min={4}
                max={16}
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
                state={confirm}
                setState={setConfirm}
                type="password"
                required={true}
                min={6}
                max={16}
            />
        </form>
    );
}
