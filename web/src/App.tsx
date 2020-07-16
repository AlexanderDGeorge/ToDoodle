import React from "react";
import styled from "styled-components";
import SignUp from "./Auth/SignUp";

const AppDiv = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function App() {
    return (
        <AppDiv>
            <SignUp />
        </AppDiv>
    );
}
