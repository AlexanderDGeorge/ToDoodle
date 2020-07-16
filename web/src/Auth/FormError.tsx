import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineExclamation } from "react-icons/ai";

const FormErrorWrapper = styled.div`
    position: absolute;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    top: 5px;
    right: 5px;
    background-color: #cc0000;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        fill: white;
        height: 20px;
        width: auto;
    }
`;

const ErrorModalWrapper = styled.div`
    position: absolute;
    top: -5px;
    right: -5px;
    height: 38px;
    width: 186px;
    border-radius: 10px;
    border: 1px solid white;
    background: #cc0000;
    color: white;
    display: flex;
    align-items: center;
`;

export default function FormError(props: { error: string; label: string }) {
    const { error, label } = props;
    const [showError, setShowError] = useState(false);
    const id = label + "error";

    useEffect(() => {
        const formError = document.getElementById(id);
        const handleEnter = () => setShowError(true);
        const handleLeave = () => setShowError(false);
        formError?.addEventListener("mouseenter", handleEnter);
        formError?.addEventListener("mouseleave", handleLeave);
        return () => {
            formError?.removeEventListener("mouseenter", handleEnter);
            formError?.removeEventListener("mouseenter", handleLeave);
        };
    }, []);

    return (
        <FormErrorWrapper
            id={id}
            style={error ? { opacity: 1 } : { opacity: 0 }}
        >
            <AiOutlineExclamation />
            {showError ? <ErrorModal error={error} /> : null}
        </FormErrorWrapper>
    );
}

function ErrorModal(props: { error: string }) {
    const { error } = props;
    return (
        <ErrorModalWrapper>
            <p style={{ paddingLeft: 10 }}>{error}</p>
        </ErrorModalWrapper>
    );
}
