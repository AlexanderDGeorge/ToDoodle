import React from "react";
import styled from "styled-components";

interface FormErrors {
    first?: string;
    last?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const FormWrapper = styled.form``;

export default function Form() {
    return <FormWrapper></FormWrapper>;
}
